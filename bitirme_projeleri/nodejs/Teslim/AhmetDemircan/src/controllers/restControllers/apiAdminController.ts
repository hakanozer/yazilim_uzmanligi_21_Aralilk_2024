import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { AppError } from '../../services/authService';
import Blog from '../../models/blogModel';
import News from '../../models/newsModel';
import User from '../../models/userModel';

export const adminListUsers = asyncHandler(async (_req: Request, res: Response) => {
  const items = await User.find().select('_id name email roles createdAt').lean();
  return res.json({ items });
});

export const adminListBlogs = asyncHandler(async (_req: Request, res: Response) => {
  const items = await Blog.find().sort({ createdAt: -1 }).lean();
  return res.json({ items });
});

export const adminListNews = asyncHandler(async (_req: Request, res: Response) => {
  const items = await News.find().sort({ createdAt: -1 }).lean();
  return res.json({ items });
});

export const adminDeleteBlog = asyncHandler(async (req: Request, res: Response) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new AppError(404, 'Blog bulunamadı');
  await blog.deleteOne();
  return res.json({ ok: true });
});

export const adminDeleteNews = asyncHandler(async (req: Request, res: Response) => {
  const news = await News.findById(req.params.id);
  if (!news) throw new AppError(404, 'Haber bulunamadı');
  await news.deleteOne();
  return res.json({ ok: true });
});

export const adminTogglePublishBlog = asyncHandler(async (req: Request, res: Response) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new AppError(404, 'Blog bulunamadı');

  const { publish } = req.body as { publish?: boolean };
  if (typeof publish !== 'boolean') throw new AppError(400, 'publish alanı boolean olmalı');

  blog.isPublished = publish;
  await blog.save();
  return res.json({ ok: true, item: blog });
});

export const adminToggleActiveNews = asyncHandler(async (req: Request, res: Response) => {
  const news = await News.findById(req.params.id);
  if (!news) throw new AppError(404, 'Haber bulunamadı');

  const { active } = req.body as { active?: boolean };
  if (typeof active !== 'boolean') throw new AppError(400, 'active alanı boolean olmalı');

  news.isActive = active;
  await news.save();
  return res.json({ ok: true, item: news });
});

export const adminUpdateUserRoles = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new AppError(404, 'Kullanıcı bulunamadı');

  const rolesInput = (req.body as any).roles;
  let rolesArr: string[] = [];

  if (Array.isArray(rolesInput)) {
    rolesArr = rolesInput.map((r) => String(r).trim()).filter(Boolean);
  } else if (typeof rolesInput === 'string') {
    rolesArr = rolesInput.split(',').map((r) => r.trim()).filter(Boolean);
  } else {
    throw new AppError(400, 'roles alanı string veya dizi olmalı');
  }

  const allowed = ['user', 'author', 'admin'];
  const newRoles = Array.from(new Set(rolesArr.filter((r) => allowed.includes(r))));

  if (!newRoles.length) throw new AppError(400, 'En az bir geçerli rol girin (user, author, admin)');

  user.roles = newRoles as any;
  await user.save();

  return res.json({ ok: true, item: { _id: user._id, roles: user.roles } });
});