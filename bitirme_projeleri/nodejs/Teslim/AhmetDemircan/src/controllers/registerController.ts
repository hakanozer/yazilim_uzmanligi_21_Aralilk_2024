import { Request, Response } from 'express';
import { registerUser, AppError } from '../services/authService';

export async function registerForm(req: Request, res: Response) {
  res.render('auth/register', { title: 'Kayıt Ol', errors: [], values: {} });
}

export async function register(req: Request, res: Response) {
  const { email, password, name } = req.body as { email?: string; password?: string; name?: string };
  const values = { email, name };

  try {
    await registerUser({ email, password, name });

    return res.redirect(`/auth/login?success=${encodeURIComponent('Kayıt başarılı! Giriş yapabilirsiniz.')}`);
  } catch (err) {
    const status = err instanceof AppError ? err.status : 500;
    const msg = err instanceof AppError ? err.message : 'Beklenmeyen bir hata oluştu.';
    return res.status(status).render('auth/register', { title: 'Kayıt Ol', errors: [msg], values });
  }
}