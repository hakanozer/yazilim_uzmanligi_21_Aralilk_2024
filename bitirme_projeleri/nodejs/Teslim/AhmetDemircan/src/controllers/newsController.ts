// Üst importlar
import { Request, Response } from 'express';
import News from '../models/newsModel';
import { DecodedToken } from './authController';
import { asyncHandler } from '../utils/asyncHandler';
import Category from '../models/categoriesModel';
import { AppError } from '../services/authService';

export const listNewsPage = asyncHandler(async (req: Request, res: Response) => {
  const limit = 9;
  const totalCount = await News.countDocuments({ isActive: true });
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const currentPage = Math.min(Math.max(Number(req.query.page) || 1, 1), totalPages);
  const skip = (currentPage - 1) * limit;

  const items = await News.find({ isActive: true })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('author', 'name')
    .populate('category', 'name')
    .lean();

  const displayNews = items.map((n: any) => {
    const raw = typeof n.content === 'string' ? n.content : '';
    const plain = raw.replace(/<[^>]+>/g, '').trim();
    const excerpt = plain.length > 220 ? plain.slice(0, 220) + '…' : plain;
    return { ...n, excerpt };
  });

  res.render('news/index', {
    title: 'Haberler',
    news: displayNews,
    currentPage,
    totalPages
  });
});

export const showNewsPage = asyncHandler(async (req: Request, res: Response) => {
  const item = await News.findById(req.params.id)
    .populate('author', 'name')
    .populate('category', 'name')
    .lean();

  if (!item) return res.status(404).render('errors/404', { title: '404 - Haber Bulunamadı' });
  res.render('news/show', { title: item.title, news: item });
});

// newNewsForm (tek tanım olacak şekilde)
export async function newNewsForm(req: Request, res: Response) {
  const user = (req as any).user as DecodedToken | undefined;
  const userRoles = Array.isArray(user?.roles) ? user!.roles : user?.roles ? [user.roles] : [];
  const allowed = userRoles.includes('admin') || userRoles.includes('author');
  if (!allowed) return res.status(403).render('errors/403', { title: '403 - Yetkisiz' });

  const categories = await Category.find({ isActive: true, kind: { $in: ['news', 'both'] } })
    .sort({ name: 1 })
    .lean();

  return res.render('news/new', { title: 'Yeni Haber', categories });
}

// İsteğe bağlı: Web’den JSON ile haber oluşturma (form yerine AJAX kullanıyorsanız)
// createNews (AppError ve asyncHandler ile)
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

// Düzenleme formu
export const editNewsForm = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user as DecodedToken | undefined;
  if (!user) throw new AppError(401, 'Yetkisiz: giriş yapın');

  const news = await News.findById(req.params.id);
  if (!news) {
    return res.status(404).render('errors/404', { title: '404 - Haber Bulunamadı' });
  }

  const isOwner = String(news.author) === String(user.sub);
  const isAdmin = Array.isArray(user.roles) && user.roles.includes('admin');
  if (!isOwner && !isAdmin) throw new AppError(403, 'Bu haberi düzenleme yetkiniz yok');

  const categories = await Category.find({ isActive: true, kind: { $in: ['news', 'both'] } })
    .sort({ name: 1 })
    .lean();

  return res.render('news/edit', {
    title: 'Haberi Düzenle',
    news: news.toObject(),
    categories,
    isOwner,
    isAdmin
  });
});