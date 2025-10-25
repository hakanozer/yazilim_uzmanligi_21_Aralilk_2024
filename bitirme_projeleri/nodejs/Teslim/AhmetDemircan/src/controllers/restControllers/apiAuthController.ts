import { Request, Response } from 'express';
import { registerUser, loginUser, AppError } from '../../services/authService';
import User from '../../models/userModel';
import { signToken, DecodedToken } from '../../controllers/authController';
import { asyncHandler } from '../../utils/asyncHandler';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const created = await registerUser(req.body as { email?: string; password?: string; name?: string });
  return res.status(201).json({
    id: created._id,
    email: created.email,
    name: created.name,
    roles: created.roles
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { user, token } = await loginUser(req.body as { email?: string; password?: string });
  return res.status(200).json({
    token,
    user: { id: user._id, email: user.email, name: user.name, roles: user.roles }
  });
});

export const profile = asyncHandler(async (req: Request, res: Response) => {
  const decoded = (req as any).user as DecodedToken | undefined;
  if (!decoded) throw new AppError(401, 'Yetkisiz: token gerekli');

  const user = await User.findById(decoded.sub)
    .select('_id email name roles createdAt updatedAt')
    .lean();
  if (!user) throw new AppError(404, 'Kullanıcı bulunamadı');

  return res.status(200).json({
    user: { id: user._id, email: user.email, name: user.name, roles: user.roles }
  });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const decoded = (req as any).user as DecodedToken | undefined;
  if (!decoded) throw new AppError(401, 'Yetkisiz: token gerekli');

  const user = await User.findById(decoded.sub);
  if (!user) throw new AppError(404, 'Kullanıcı bulunamadı');

  const token = signToken(user);
  return res.status(200).json({ token });
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  res.setHeader('Set-Cookie', 'token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax');
  return res.status(200).json({ ok: true, message: 'Çıkış yapıldı' });
});