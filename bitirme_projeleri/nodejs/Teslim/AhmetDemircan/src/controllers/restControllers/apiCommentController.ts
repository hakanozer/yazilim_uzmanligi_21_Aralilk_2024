import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { AppError } from '../../services/authService';
import Comment from '../../models/commentModel';
import Blog from '../../models/blogModel';
import News from '../../models/newsModel';
import { DecodedToken } from '../authController';

function isAdmin(req: Request): boolean {
  const roles: string[] = ((req as any).user?.roles) || [];
  return Array.isArray(roles) && roles.includes('admin');
}

function toPublic(comment: any) {
  const author = comment.author && typeof comment.author === 'object'
    ? { id: String(comment.author._id), name: comment.author.name, profilePicture: comment.author.profilePicture }
    : { id: String(comment.author) };
  return {
    id: String(comment._id),
    content: comment.content,
    author,
    subjectModel: comment.subjectModel,
    subject: String(comment.subject),
    isActive: !!comment.isActive,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt
  };
}

// Yorum yönetimi: listeleme (user: kendi yorumları, admin: tüm yorumlar)
export const listComments = asyncHandler(async (req: Request, res: Response) => {
  const me = (req as any).user as DecodedToken | undefined;
  if (!me) throw new AppError(401, 'Yetkisiz: token gerekli');

  const admin = isAdmin(req);
  const { author, subjectModel, subject, isActive } = req.query as {
    author?: string; subjectModel?: 'Blog' | 'News'; subject?: string; isActive?: string;
  };

  const filter: any = {};
  // Kullanıcı: sadece kendi yorumları
  if (!admin) {
    filter.author = me.sub;
  } else {
    // Admin: opsiyonel filtreler
    if (author) filter.author = author;
    if (subjectModel) filter.subjectModel = subjectModel;
    if (subject) filter.subject = subject;
    if (typeof isActive !== 'undefined') {
      if (isActive === 'true') filter.isActive = true;
      else if (isActive === 'false') filter.isActive = false;
    }
  }
  // Her iki rolde de opsiyonel konu filtreleri kullanılabilsin
  if (!admin) {
    if (subjectModel) filter.subjectModel = subjectModel;
    if (subject) filter.subject = subject;
  }

  const items = await Comment.find(filter)
    .sort({ createdAt: -1 })
    .populate('author', '_id name profilePicture')
    .lean();

  return res.json({ items: items.map(toPublic) });
});

// Blog için yorumları listele
export const listBlogComments = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const exists = await Blog.exists({ _id: id });
  if (!exists) throw new AppError(404, 'Blog bulunamadı');

  const isAdminUser = isAdmin(req);
  const filter: any = { subjectModel: 'Blog', subject: id };
  if (!isAdminUser) filter.isActive = true;

  const items = await Comment.find(filter)
    .sort({ createdAt: -1 })
    .populate('author', '_id name profilePicture')
    .lean();

  return res.json({ items: items.map(toPublic) });
});

// News için yorumları listele
export const listNewsComments = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const exists = await News.exists({ _id: id });
  if (!exists) throw new AppError(404, 'Haber bulunamadı');

  const isAdminUser = isAdmin(req);
  const filter: any = { subjectModel: 'News', subject: id };
  if (!isAdminUser) filter.isActive = true;

  const items = await Comment.find(filter)
    .sort({ createdAt: -1 })
    .populate('author', '_id name profilePicture')
    .lean();

  return res.json({ items: items.map(toPublic) });
});

// Yorum oluştur
// createComment içinde
export const createComment = asyncHandler(async (req: Request, res: Response) => {
  const me = (req as any).user as DecodedToken | undefined;
  if (!me) throw new AppError(401, 'Yetkisiz: token gerekli');

  const { content, subjectModel, subject } = req.body as {
    content?: string;
    subjectModel?: 'Blog' | 'News';
    subject?: string;
  };

  if (!content || !subjectModel || !subject) throw new AppError(400, 'content, subjectModel, subject gerekli');

  if (subjectModel === 'Blog') {
    const exists = await Blog.exists({ _id: subject });
    if (!exists) throw new AppError(404, 'Blog bulunamadı');
  } else if (subjectModel === 'News') {
    const exists = await News.exists({ _id: subject });
    if (!exists) throw new AppError(404, 'Haber bulunamadı');
  } else {
    throw new AppError(400, 'subjectModel Blog veya News olmalı');
  }

  // Tek yorum kuralı: varsa mevcut yorumu güncelle/yeniden etkinleştir
  const existing = await Comment.findOne({ author: me.sub, subjectModel, subject });
  if (existing) {
    existing.content = String(content).trim();
    existing.isActive = true;
    await existing.save();
    await existing.populate('author', '_id name profilePicture');
    return res.status(200).json({ ok: true, item: toPublic(existing) });
  }

  const created = await Comment.create({
    content: String(content).trim(),
    author: me.sub,
    subjectModel,
    subject,
    isActive: true
  });

  if (subjectModel === 'Blog') {
    await Blog.findByIdAndUpdate(subject, { $push: { comments: created._id } });
  } else {
    await News.findByIdAndUpdate(subject, { $push: { comments: created._id } });
  }

  await created.populate('author', '_id name profilePicture');

  return res.status(201).json({ ok: true, item: toPublic(created) });
});

// Yorum güncelle (sadece sahibi veya admin)
export const updateComment = asyncHandler(async (req: Request, res: Response) => {
  const me = (req as any).user as DecodedToken | undefined;
  if (!me) throw new AppError(401, 'Yetkisiz: token gerekli');

  const { id } = req.params;
  const { content, isActive } = req.body as { content?: string; isActive?: boolean };

  const comment = await Comment.findById(id);
  if (!comment) throw new AppError(404, 'Yorum bulunamadı');

  const admin = isAdmin(req);
  const owner = String(comment.author) === me.sub;

  let changed = false;

  if (typeof content === 'string') {
    if (!owner && !admin) throw new AppError(403, 'Yalnızca sahibi veya admin güncelleyebilir');
    if (!content.trim()) throw new AppError(400, 'content gerekli');
    comment.content = content.trim();
    changed = true;
  }

  if (typeof isActive === 'boolean') {
    if (!admin) throw new AppError(403, 'isActive sadece admin tarafından değiştirilebilir');
    comment.set('isActive', isActive);
    changed = true;
  }

  if (!changed) throw new AppError(400, 'Güncellenecek alan belirtilmeli');

  await comment.save();
  await comment.populate('author', '_id name profilePicture');

  return res.json({ ok: true, item: toPublic(comment) });
});

// Yorum sil (sadece sahibi veya admin)
export const deleteComment = asyncHandler(async (req: Request, res: Response) => {
  const me = (req as any).user as DecodedToken | undefined;
  if (!me) throw new AppError(401, 'Yetkisiz: token gerekli');

  const { id } = req.params;
  const comment = await Comment.findById(id);
  if (!comment) throw new AppError(404, 'Yorum bulunamadı');

  const owner = String(comment.author) === me.sub;
  if (!owner && !isAdmin(req)) throw new AppError(403, 'Yalnızca sahibi veya admin silebilir');

  const subjectId = String(comment.subject);
  const subjectModel = comment.subjectModel;

  await comment.deleteOne();

  // Parent’ten pull et
  if (subjectModel === 'Blog') {
    await Blog.findByIdAndUpdate(subjectId, { $pull: { comments: comment._id } });
  } else if (subjectModel === 'News') {
    await News.findByIdAndUpdate(subjectId, { $pull: { comments: comment._id } });
  }

  return res.json({ ok: true, id });
});