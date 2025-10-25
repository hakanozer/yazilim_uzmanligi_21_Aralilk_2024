import { Request, Response } from 'express';
import News from '../../models/newsModel';
import { DecodedToken } from '../authController';
import { asyncHandler } from '../../utils/asyncHandler';
import { AppError } from '../../services/authService';

function isOwnerOrAdmin(user: DecodedToken | undefined, author: any) {
  if (!user) return false;
  const isOwner = String(author) === String(user.sub);
  const isAdmin = Array.isArray(user.roles) ? user.roles.includes('admin') : user.roles === 'admin';
  return isOwner || isAdmin;
}

export const listNews = asyncHandler(async (_req: Request, res: Response) => {
  const items = await News.find()
    .sort({ createdAt: -1 })
    .populate('author', 'name email')
    .populate('category', 'name')
    .lean();
  return res.json({ items });
});

export const getNews = asyncHandler(async (req: Request, res: Response) => {
  const item = await News.findById(req.params.id)
    .populate('author', 'name email')
    .populate('category', 'name')
    .lean();
  if (!item) throw new AppError(404, 'Haber bulunamadı');
  return res.json({ item });
});

// createNews (başı değişmeden kalır)
export const createNews = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user as DecodedToken | undefined;
  if (!user) throw new AppError(401, 'Yetkisiz: giriş yapın');

  const { title, content, category, isActive, imageUrl } = req.body;
  if (!title?.trim() || !content?.trim()) {
    throw new AppError(400, 'Başlık ve içerik zorunlu');
  }

  const doc = await News.create({
    title: title.trim(),
    content,
    category: category || undefined,
    author: user.sub,
    isActive: !!isActive,
    imageUrl: imageUrl?.trim() || undefined
  });

  return res.status(201).json({ ok: true, item: doc });
});

// updateNews / deleteNews / like/dislike aynı dosyada kalabilir; istedikçe asyncHandler’a geçirilebilir.
export const updateNews = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user as DecodedToken | undefined;
  const news = await News.findById(req.params.id);
  if (!news) throw new AppError(404, 'Haber bulunamadı');

  const isAdmin = Array.isArray(user?.roles) ? user!.roles.includes('admin') : (user?.roles === 'admin');
  const owner = user && String(news.author) === String(user.sub);
  if (!owner && !isAdmin) throw new AppError(403, 'Yetkisiz');

  // Admin sahibi değilse: yalnızca aktif/pasif durumunu değiştirebilir
  if (isAdmin && !owner) {
    const { isActive } = req.body as { isActive?: boolean };
    const forbiddenKeys = ['title', 'content', 'category', 'imageUrl']
      .filter(k => typeof (req.body as any)[k] !== 'undefined');
    if (forbiddenKeys.length) {
      throw new AppError(403, 'Admin, sahibi olmadığı içeriğin başlık/içerik/görsel alanlarını değiştiremez');
    }
    if (typeof isActive !== 'boolean') {
      throw new AppError(400, 'isActive alanı boolean olmalı');
    }
    news.isActive = isActive;
    await news.save();
    return res.json({ ok: true, item: news });
  }

  const { title, content, category, isActive, imageUrl } = req.body as {
    title?: string; content?: string; category?: any; isActive?: boolean; imageUrl?: string;
  };

  news.title = typeof title !== 'undefined' ? title : news.title;
  news.content = typeof content !== 'undefined' ? content : news.content;
  news.category = typeof category !== 'undefined' ? category : news.category;
  news.isActive = typeof isActive === 'boolean' ? isActive : news.isActive;
  if (typeof imageUrl !== 'undefined') {
    news.imageUrl = imageUrl?.trim() || undefined;
  }

  await news.save();
  return res.json({ ok: true, item: news });
});

export const deleteNews = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user as DecodedToken | undefined;
  const news = await News.findById(req.params.id);
  if (!news) throw new AppError(404, 'Haber bulunamadı');
  if (!isOwnerOrAdmin(user, news.author)) throw new AppError(403, 'Yetkisiz');

  await news.deleteOne();
  return res.json({ ok: true });
});

// Yeni: beğeni endpoint’i
export const likeNews = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user as DecodedToken | undefined;
  if (!user) throw new AppError(401, 'Yetkisiz: giriş yapın');

  const news = await News.findById(req.params.id);
  if (!news) throw new AppError(404, 'Haber bulunamadı');

  const userId = user.sub;
  const likesArray = Array.isArray((news as any).likesID) ? (news as any).likesID : [];
  const dislikesArray = Array.isArray((news as any).dislikesID) ? (news as any).dislikesID : [];

  if (!Array.isArray((news as any).likesID) || !Array.isArray((news as any).dislikesID)) {
    await News.updateOne({ _id: news._id }, { $set: { likesID: likesArray, dislikesID: dislikesArray } });
  }

  const likedByUser = likesArray.some((id: any) => String(id) === String(userId));
  const dislikedByUser = dislikesArray.some((id: any) => String(id) === String(userId));

  let action = 'liked';
  let updated = null;

  if (likedByUser) {
    updated = await News.findByIdAndUpdate(
      req.params.id,
      { $pull: { likesID: userId } },
      { new: true }
    ).lean();
    action = 'unliked';
  } else if (dislikedByUser) {
    updated = await News.findByIdAndUpdate(
      req.params.id,
      { $pull: { dislikesID: userId }, $addToSet: { likesID: userId } },
      { new: true }
    ).lean();
    action = 'switched_to_like';
  } else {
    updated = await News.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likesID: userId } },
      { new: true }
    ).lean();
    action = 'liked';
  }

  return res.json({
    ok: true,
    action,
    likesCount: Array.isArray(updated?.likesID) ? updated!.likesID.length : 0,
    dislikesCount: Array.isArray(updated?.dislikesID) ? updated!.dislikesID.length : 0
  });
});
// Yeni: beğenmeme endpoint’i
export const dislikeNews = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user as DecodedToken | undefined;
  if (!user) throw new AppError(401, 'Yetkisiz: giriş yapın');

  const news = await News.findById(req.params.id);
  if (!news) throw new AppError(404, 'Haber bulunamadı');

  const userId = user.sub;
  const likesArray = Array.isArray((news as any).likesID) ? (news as any).likesID : [];
  const dislikesArray = Array.isArray((news as any).dislikesID) ? (news as any).dislikesID : [];

  if (!Array.isArray((news as any).likesID) || !Array.isArray((news as any).dislikesID)) {
    await News.updateOne({ _id: news._id }, { $set: { likesID: likesArray, dislikesID: dislikesArray } });
  }

  const likedByUser = likesArray.some((id: any) => String(id) === String(userId));
  const dislikedByUser = dislikesArray.some((id: any) => String(id) === String(userId));

  let action = 'disliked';
  let updated = null;

  if (dislikedByUser) {
    updated = await News.findByIdAndUpdate(
      req.params.id,
      { $pull: { dislikesID: userId } },
      { new: true }
    ).lean();
    action = 'undisliked';
  } else if (likedByUser) {
    updated = await News.findByIdAndUpdate(
      req.params.id,
      { $pull: { likesID: userId }, $addToSet: { dislikesID: userId } },
      { new: true }
    ).lean();
    action = 'switched_to_dislike';
  } else {
    updated = await News.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { dislikesID: userId } },
      { new: true }
    ).lean();
    action = 'disliked';
  }

  return res.json({
    ok: true,
    action,
    likesCount: Array.isArray(updated?.likesID) ? updated!.likesID.length : 0,
    dislikesCount: Array.isArray(updated?.dislikesID) ? updated!.dislikesID.length : 0
  });
});
