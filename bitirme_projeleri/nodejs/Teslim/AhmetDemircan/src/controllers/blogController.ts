import { Request, Response } from 'express';
import Blog from '../models/blogModel';
import { DecodedToken } from './authController';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../services/authService';
import Category from '../models/categoriesModel';

export const createBlog = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user as DecodedToken | undefined;
  if (!user) throw new AppError(401, 'Yetkisiz: giriş yapın');

  const { title, content, tags, categories, coverImageUrl, isPublished } = req.body;
  if (!title?.trim() || !content?.trim()) {
    throw new AppError(400, 'Başlık ve içerik zorunlu');
  }

  const normalizedCategories = Array.isArray(categories)
    ? categories.map((c: any) => String(c).trim()).filter(Boolean)
    : typeof categories === 'string' && categories.length
    ? categories.split(',').map((c: string) => c.trim()).filter(Boolean)
    : [];

  const doc = await Blog.create({
    title: title.trim(),
    content,
    tags,
    categories: normalizedCategories,
    coverImageUrl,
    isPublished: !!isPublished,
    author: user.sub
  });

  return res.status(201).json({ ok: true, blog: doc });
});

export const listBlogsPage = asyncHandler(async (req: Request, res: Response) => {
  const limit = 9;
  const totalCount = await Blog.countDocuments({ isPublished: true });
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const currentPage = Math.min(Math.max(Number(req.query.page) || 1, 1), totalPages);
  const skip = (currentPage - 1) * limit;

  const blogs = await Blog.find({ isPublished: true })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('author', 'name')
    .lean();

  const displayBlogs = blogs.map((b: any) => {
    const raw = typeof b.content === 'string' ? b.content : '';
    const plain = raw.replace(/<[^>]+>/g, '').trim();
    const excerpt = plain.length > 220 ? plain.slice(0, 220) + '…' : plain;
    return { ...b, excerpt };
  });

  res.render('blogs/index', { title: 'Blog Yazıları', blogs: displayBlogs, currentPage, totalPages });
});

export const showBlogPage = asyncHandler(async (req: Request, res: Response) => {
  const blog = await Blog.findById(req.params.id)
    .populate('author', 'name')
    .populate('categories', 'name')
    .lean();
  if (!blog) return res.status(404).render('errors/404', { title: '404 - Blog Yok' });
  res.render('blogs/show', { title: blog.title, blog });
});

export const newBlogForm = asyncHandler(async (req: Request, res: Response) => {
  const categories = await Category.find({ isActive: true, kind: { $in: ['blog', 'both'] } })
    .sort({ name: 1 })
    .lean();
  res.render('blogs/new', { title: 'Yeni Blog Yazısı', categories });
});

// Yeni: düzenleme formu
export const editBlogForm = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user as DecodedToken | undefined;
  if (!user) throw new AppError(401, 'Yetkisiz: giriş yapın');

  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).render('errors/404', { title: '404 - Blog Yok' });
  }

  const isOwner = String(blog.author) === String(user.sub);
  const isAdmin = Array.isArray(user.roles) && user.roles.includes('admin');
  if (!isOwner && !isAdmin) throw new AppError(403, 'Bu yazıyı düzenleme yetkiniz yok');

  const categories = await Category.find({ isActive: true, kind: { $in: ['blog', 'both'] } })
    .sort({ name: 1 })
    .lean();

  return res.render('blogs/edit', { title: `Blogu Düzenle`, blog: blog.toObject(), categories });
});

// Yeni: blog güncelle
export const updateBlog = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user as DecodedToken | undefined;
  if (!user) throw new AppError(401, 'Yetkisiz: giriş yapın');

  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new AppError(404, 'Blog bulunamadı');

  const isOwner = String(blog.author) === String(user.sub);
  const isAdmin = Array.isArray(user.roles) && user.roles.includes('admin');
  if (!isOwner && !isAdmin) throw new AppError(403, 'Bu yazıyı güncelleme yetkiniz yok');

  const { title, content, tags, categories, coverImageUrl, isPublished } = req.body;

  if (!title?.trim() || !content?.trim()) {
    throw new AppError(400, 'Başlık ve içerik zorunlu');
  }

  const normalizedCategories = Array.isArray(categories)
    ? categories.map((c: any) => String(c).trim()).filter(Boolean)
    : typeof categories === 'string' && categories.length
    ? categories.split(',').map((c: string) => c.trim()).filter(Boolean)
    : [];

  const normalizedTags = Array.isArray(tags)
    ? tags.map((t: any) => String(t).trim()).filter(Boolean)
    : typeof tags === 'string' && tags.length
    ? tags.split(',').map((t: string) => t.trim()).filter(Boolean)
    : [];

  blog.title = title.trim();
  blog.content = content;
  blog.coverImageUrl = coverImageUrl?.trim() || undefined;
  blog.tags = normalizedTags;
  blog.categories = normalizedCategories as any;
  blog.isPublished = !!isPublished;
  if (blog.isPublished && !blog.publishedAt) blog.publishedAt = new Date();
  if (!blog.isPublished) blog.publishedAt = undefined;

  await blog.save();

  return res.json({ ok: true, blog });
});

// Yeni: blog sil
export const deleteBlog = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user as DecodedToken | undefined;
  if (!user) throw new AppError(401, 'Yetkisiz: giriş yapın');

  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new AppError(404, 'Blog bulunamadı');

  const isOwner = String(blog.author) === String(user.sub);
  const isAdmin = Array.isArray(user.roles) && user.roles.includes('admin');
  if (!isOwner && !isAdmin) throw new AppError(403, 'Bu yazıyı silme yetkiniz yok');

  await blog.deleteOne();

  return res.json({ ok: true });
});

// Yeni: yayına al / yayından çek (isPublished + publishedAt)
export const togglePublish = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user as DecodedToken | undefined;
  if (!user) throw new AppError(401, 'Yetkisiz: giriş yapın');

  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new AppError(404, 'Blog bulunamadı');

  const isOwner = String(blog.author) === String(user.sub);
  const isAdmin = Array.isArray(user.roles) && user.roles.includes('admin');
  if (!isOwner && !isAdmin) throw new AppError(403, 'Bu yazıyı yayınlama yetkiniz yok');

  const { publish } = req.body as { publish?: boolean };
  if (typeof publish !== 'boolean') throw new AppError(400, 'publish alanı (true/false) gerekli');

  blog.isPublished = publish;
  if (publish) {
    blog.publishedAt = blog.publishedAt || new Date();
  } else {
    blog.publishedAt = undefined;
  }

  await blog.save();
  return res.json({ ok: true, isPublished: blog.isPublished, publishedAt: blog.publishedAt || null });
});