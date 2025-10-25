import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import User, { UserRole } from '../../models/userModel';
import { asyncHandler } from '../../utils/asyncHandler';
import { isValidEmail, isValidPassword } from '../../utils/validators';
import { AppError } from '../../services/authService';
import { DecodedToken } from '../authController';

// Yardımcı: isAdmin
function isAdmin(req: Request): boolean {
  const roles: UserRole[] = (req as any).user?.roles || [];
  return Array.isArray(roles) && roles.includes('admin');
}

// Mevcut kullanıcı profili (JWT ile)
export const getMyProfile = asyncHandler(async (req: Request, res: Response) => {
  const me = (req as any).user as DecodedToken | undefined;
  if (!me) throw new AppError(401, 'Yetkisiz: token gerekli');

  const user = await User.findById(me.sub)
    .select('_id email name roles profilePicture createdAt updatedAt')
    .lean();
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

// Ad ve e‑posta güncelleme
export const updateMyInfo = asyncHandler(async (req: Request, res: Response) => {
  const me = (req as any).user as DecodedToken | undefined;
  if (!me) throw new AppError(401, 'Yetkisiz: token gerekli');

  const { name, email } = req.body as { name?: string; email?: string };
  if (email && !isValidEmail(email)) throw new AppError(400, 'Geçerli bir e‑posta girin');

  const exists = email ? await User.findOne({ email, _id: { $ne: me.sub } }).lean() : null;
  if (exists) throw new AppError(409, 'Bu e‑posta zaten kayıtlı');

  const user = await User.findById(me.sub);
  if (!user) throw new AppError(404, 'Kullanıcı bulunamadı');

  if (typeof name === 'string') user.name = name.trim();
  if (typeof email === 'string') user.email = email.trim().toLowerCase();

  await user.save();

  return res.json({
    message: 'Profil güncellendi',
    user: { id: String(user._id), name: user.name, email: user.email }
  });
});

// Şifre değiştirme
export const changeMyPassword = asyncHandler(async (req: Request, res: Response) => {
  const me = (req as any).user as DecodedToken | undefined;
  if (!me) throw new AppError(401, 'Yetkisiz: token gerekli');

  const { currentPassword, newPassword } = req.body as { currentPassword?: string; newPassword?: string };
  if (!currentPassword || !newPassword) throw new AppError(400, 'Mevcut ve yeni şifre gerekli');
  if (!isValidPassword(newPassword)) throw new AppError(400, 'Şifre en az 8 karakter olmalı');

  const user = await User.findById(me.sub);
  if (!user) throw new AppError(404, 'Kullanıcı bulunamadı');

  const ok = await user.comparePassword(currentPassword);
  if (!ok) throw new AppError(400, 'Mevcut şifre yanlış');

  user.password = newPassword; // pre-save hook ile hash’lenir
  await user.save();

  return res.json({ message: 'Şifre güncellendi' });
});

// Profil fotoğrafı yükleme (server-side)
export const uploadMyAvatar = asyncHandler(async (req: Request, res: Response) => {
  const me = (req as any).user as DecodedToken | undefined;
  if (!me) throw new AppError(401, 'Yetkisiz: token gerekli');

  const file: any = (req as any).file;
  if (!file) throw new AppError(400, 'Dosya gerekli');

  const allowed = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  if (file.mimetype && !allowed.includes(file.mimetype)) throw new AppError(400, 'Desteklenmeyen dosya tipi');

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'profiles');
  await fs.promises.mkdir(uploadsDir, { recursive: true });

  const ext = path.extname(file.originalname || '');
  const safeExt = ext && ['.png', '.jpg', '.jpeg', '.webp'].includes(ext.toLowerCase()) ? ext : '.png';
  const filename = `${me.sub}_${Date.now()}${safeExt}`;
  const targetPath = path.join(uploadsDir, filename);

  if (file.path) {
    await fs.promises.copyFile(file.path, targetPath);
  } else if (file.buffer) {
    await fs.promises.writeFile(targetPath, file.buffer);
  } else {
    throw new AppError(400, 'Dosya içeriği okunamadı');
  }

  const user = await User.findById(me.sub);
  if (!user) throw new AppError(404, 'Kullanıcı bulunamadı');

  user.profilePicture = `/uploads/profiles/${filename}`;
  await user.save();

  return res.json({ message: 'Profil fotoğrafı güncellendi', profilePicture: user.profilePicture });
});

// Kendi hesabını silme
export const deleteMe = asyncHandler(async (req: Request, res: Response) => {
  const me = (req as any).user as DecodedToken | undefined;
  if (!me) throw new AppError(401, 'Yetkisiz: token gerekli');

  const user = await User.findByIdAndDelete(me.sub);
  if (!user) throw new AppError(404, 'Kullanıcı bulunamadı');

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