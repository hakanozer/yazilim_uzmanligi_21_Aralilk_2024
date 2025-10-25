import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import User, { UserRole } from '../models/userModel';
import { isValidEmail, isValidPassword } from '../utils/validators';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../services/authService';
import Blog from '../models/blogModel';
import News from '../models/newsModel';

export function logout(req: Request, res: Response) {
    req.session?.destroy(() => {
        res.clearCookie('token', { httpOnly: true, sameSite: 'lax' });
        return res.redirect('/');
    });
}

// Yardımcı: oturumdaki kullanıcı id'sini al
function getCurrentUserId(req: Request): string | undefined {
  const fromSession = (req as any).session?.user?.sub;
  const fromReqUser = (req as any).user?.sub;
  return String(fromSession || fromReqUser || '');
}

// Yardımcı: admin mi?
function isAdmin(req: Request): boolean {
  const roles: UserRole[] = (req as any).session?.user?.roles || (req as any).user?.roles || [];
  return Array.isArray(roles) && roles.includes('admin');
}

// API/Web: profil verisi
export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = getCurrentUserId(req);
  if (!userId) throw new AppError(401, 'Giriş gerekli');

  const user = await User.findById(userId).lean();
  if (!user) throw new AppError(404, 'Kullanıcı bulunamadı');

  return res.json({
    user: {
      id: String(user._id),
      email: user.email,
      name: user.name,
      roles: user.roles,
      profilePicture: user.profilePicture
    }
  });
});

// API/Web: ad ve e‑posta güncelle
export const updateProfileInfo = asyncHandler(async (req: Request, res: Response) => {
  const userId = getCurrentUserId(req);
  if (!userId) throw new AppError(401, 'Giriş gerekli');

  const { name, email } = req.body as { name?: string; email?: string };
  if (email && !isValidEmail(email)) throw new AppError(400, 'Geçerli bir e‑posta girin');

  const exists = email ? await User.findOne({ email, _id: { $ne: userId } }).lean() : null;
  if (exists) throw new AppError(409, 'Bu e‑posta zaten kayıtlı');

  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'Kullanıcı bulunamadı');

  if (typeof name === 'string') user.name = name.trim();
  if (typeof email === 'string') user.email = email.trim().toLowerCase();
  await user.save();

  if ((req as any).session?.user) {
    (req as any).session.user.name = user.name;
    (req as any).session.user.email = user.email;
  }

  return res.json({ message: 'Profil güncellendi', user: { id: String(user._id), name: user.name, email: user.email } });
});

// API/Web: şifre değiştir
export const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const userId = getCurrentUserId(req);
  if (!userId) throw new AppError(401, 'Giriş gerekli');

  const { currentPassword, newPassword } = req.body as { currentPassword?: string; newPassword?: string };
  if (!currentPassword || !newPassword) throw new AppError(400, 'Mevcut ve yeni şifre gerekli');
  if (!isValidPassword(newPassword)) throw new AppError(400, 'Şifre en az 8 karakter olmalı');

  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'Kullanıcı bulunamadı');

  const ok = await user.comparePassword(currentPassword);
  if (!ok) throw new AppError(400, 'Mevcut şifre yanlış');

  user.password = newPassword;
  await user.save();

  return res.json({ message: 'Şifre güncellendi' });
});

// API/Web: profil fotoğrafı yükle
export const uploadProfilePicture = asyncHandler(async (req: Request, res: Response) => {
    const userId = getCurrentUserId(req);
    if (!userId) throw new AppError(401, 'Giriş gerekli');
    
    const file: any = (req as any).file;
    if (!file) throw new AppError(400, 'Dosya gerekli');
    
    const allowed = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (file.mimetype && !allowed.includes(file.mimetype)) throw new AppError(400, 'Desteklenmeyen dosya tipi');
    
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'profiles');
    await fs.promises.mkdir(uploadsDir, { recursive: true });
    
    const ext = path.extname(file.originalname || '');
    const safeExt = ext && ['.png', '.jpg', '.jpeg', '.webp'].includes(ext.toLowerCase()) ? ext : '.png';
    const filename = `${userId}_${Date.now()}${safeExt}`;
    const targetPath = path.join(uploadsDir, filename);
    
    if (file.path) {
        await fs.promises.copyFile(file.path, targetPath);
    } else if (file.buffer) {
        await fs.promises.writeFile(targetPath, file.buffer);
    } else {
        throw new AppError(400, 'Dosya içeriği okunamadı');
    }
    
    const user = await User.findById(userId);
    if (!user) throw new AppError(404, 'Kullanıcı bulunamadı');
    
    user.profilePicture = `/uploads/profiles/${filename}`;
    await user.save();
    
    if ((req as any).session?.user) {
        (req as any).session.user.profilePicture = user.profilePicture;
    }
    
    return res.json({ message: 'Profil fotoğrafı güncellendi', profilePicture: user.profilePicture });
});

// API/Web: kendi hesabını sil
export const deleteMe = asyncHandler(async (req: Request, res: Response) => {
  const userId = getCurrentUserId(req);
  if (!userId) throw new AppError(401, 'Giriş gerekli');

  const user = await User.findByIdAndDelete(userId);
  if (!user) throw new AppError(404, 'Kullanıcı bulunamadı');

  req.session?.destroy(() => {});
  return res.json({ message: 'Hesap silindi' });
});

// Admin: kullanıcı sil
export const adminDeleteUser = asyncHandler(async (req: Request, res: Response) => {
  if (!isAdmin(req)) throw new AppError(403, 'Yalnızca admin kullanıcılar silebilir');
  const { id } = req.params;
  if (!id) throw new AppError(400, 'Kullanıcı ID gerekli');

  const user = await User.findByIdAndDelete(id);
  if (!user) throw new AppError(404, 'Kullanıcı bulunamadı');

  return res.json({ message: 'Kullanıcı silindi', id });
});

// Admin: roller güncelle
export const adminUpdateRoles = asyncHandler(async (req: Request, res: Response) => {
  if (!isAdmin(req)) throw new AppError(403, 'Yalnızca admin kullanıcılar rol güncelleyebilir');

  const { id } = req.params;
  const { roles } = req.body as { roles?: UserRole[] };
  if (!id) throw new AppError(400, 'Kullanıcı ID gerekli');
  if (!Array.isArray(roles) || roles.length === 0) throw new AppError(400, 'Roller gerekli');

  const allowed: UserRole[] = ['user', 'admin', 'author'];
  const sanitized = Array.from(new Set(roles)).filter((r) => allowed.includes(r));
  if (sanitized.length === 0) throw new AppError(400, 'Geçerli roller sağlanmalı');

  const user = await User.findById(id);
  if (!user) throw new AppError(404, 'Kullanıcı bulunamadı');

  user.roles = sanitized;
  await user.save();

  return res.json({ message: 'Roller güncellendi', user: { id: String(user._id), roles: user.roles } });
});

// EJS: Profil Ayarları Sayfası
export const profilePage = asyncHandler(async (req: Request, res: Response) => {
  const sessionUser = (req as any).session?.user;
  if (!sessionUser) return res.redirect('/auth/login');

  const tabParam = req.query.tab;
  const tab = typeof tabParam === 'string' ? tabParam : 'edit'; // edit | privacy | comments

  return res.render('auth/profile', {
    title: 'Profil',
    user: sessionUser,
    tab
  });
});

// Kullanıcının yazdığı blogları listele (JSON)
export const myBlogs = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).session?.user?.sub || (req as any).user?.sub;
  if (!userId) throw new AppError(401, 'Giriş gerekli');

  const docs = await Blog.find({ author: userId }).sort({ createdAt: -1 }).lean();

  const blogs = docs.map((b: any) => ({
    id: String(b._id),
    title: b.title,
    coverImageUrl: b.coverImageUrl || null,
    isPublished: !!b.isPublished,
    publishedAt: b.publishedAt ? new Date(b.publishedAt).toISOString() : null
  }));

  return res.json({ ok: true, blogs });
});

// Kullanıcının yazdığı haberleri listele (JSON)
export const myNews = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).session?.user?.sub || (req as any).user?.sub;
  if (!userId) throw new AppError(401, 'Giriş gerekli');

  const docs = await News.find({ author: userId }).sort({ createdAt: -1 }).lean();

  const news = docs.map((n: any) => ({
    id: String(n._id),
    title: n.title,
    imageUrl: n.imageUrl || null,
    isActive: !!n.isActive,
    createdAt: n.createdAt ? new Date(n.createdAt).toISOString() : null
  }));

  return res.json({ ok: true, news });
});