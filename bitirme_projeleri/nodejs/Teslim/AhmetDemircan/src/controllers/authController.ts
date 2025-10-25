import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser, UserRole } from '../models/userModel';
import User from '../models/userModel';
import { isValidEmail, isValidPassword } from '../utils/validators';

export interface DecodedToken {
  sub: string;
  roles: UserRole[];
  email: string;
  iat?: number;
  exp?: number;
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET || '';
  if (!secret) {
    throw new Error('JWT_SECRET .env içinde tanımlı olmalı');
  }
  return secret;
}

export function signToken(user: IUser): string {
  const roles = Array.isArray((user as any).roles)
    ? (user as any).roles
    : (user as any).role
    ? [(user as any).role]
    : ['user'];

  const payload: Omit<DecodedToken, 'iat' | 'exp'> = {
    sub: String(user._id),
    roles,
    email: user.email
  };
  return jwt.sign(payload, getJwtSecret(), { expiresIn: '1h' });
}

export function authorizeRoles(...roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user as DecodedToken | undefined;
    if (!user) {
      return res.status(401).json({ error: 'Yetkisiz: Kimlik doğrulama gerekli' });
    }
    const userRoles = Array.isArray(user.roles) ? user.roles : user.roles ? [user.roles] : [];
    const allowed = roles.some((r) => userRoles.includes(r));
    if (!allowed) {
      return res.status(403).json({ error: 'Erişim reddedildi: rol yetkisi yok' });
    }
    next();
  };
}

export async function registerForm(req: Request, res: Response) {
  res.render('auth/register', { title: 'Kayıt Ol', errors: [], values: {} });
}

export async function register(req: Request, res: Response) {
  const { email, password, name } = req.body as { email?: string; password?: string; name?: string };
  const errors: string[] = [];
  const values = { email, name };

  // Satır 68–69: validators.ts ile doğrulama
  if (!email || !isValidEmail(email)) errors.push('Geçerli bir e-posta girin.');
  if (!password || !isValidPassword(password)) errors.push('Şifre en az 8 karakter olmalı.');

  if (errors.length) {
    return res.status(400).render('auth/register', { title: 'Kayıt Ol', errors, values });
  }

  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).render('auth/register', { title: 'Kayıt Ol', errors: ['Bu e-posta zaten kayıtlı.'], values });
    }

    await User.create({ email, password, name, roles: ['user'] });

    // İstersen burada login sayfasına yönlendirebiliriz.
    return res.status(201).render('auth/register', { title: 'Kayıt Ol', errors: [], values: {}, success: 'Kayıt başarılı! Giriş yapabilirsiniz.' });
  } catch (err) {
    return res.status(500).render('auth/register', { title: 'Kayıt Ol', errors: ['Beklenmeyen bir hata oluştu.'], values });
  }
}

// Web isteklerinden token çek (Authorization, Cookie veya query)
function getTokenFromRequest(req: Request): string | undefined {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer ')) return auth.slice(7);

  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    const m = cookieHeader.match(/(?:^|;\s*)token=([^;]+)/);
    if (m) return decodeURIComponent(m[1]);
  }
  return undefined;
}

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const token = getTokenFromRequest(req);
  if (!token) {
    return res.status(401).json({ error: 'Yetkisiz: token gerekli' });
  }
  try {
    const decoded = jwt.verify(token, getJwtSecret()) as DecodedToken;
    (req as any).user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Geçersiz veya süresi dolmuş token' });
  }
}

// EJS sayfaları için koruma: yoksa login’e yönlendir
export function authenticateWeb(req: Request, res: Response, next: NextFunction) {
  const sessionUser = (req as any).session?.user;
  if (!sessionUser) return res.redirect('/auth/login');
  (req as any).user = sessionUser;
  return next();
}

// Kullanıcıyı EJS locals’a ekle (menü koşulları için)
export function attachUserToLocals(req: Request, res: Response, next: NextFunction) {
  const sessionUser = (req as any).session?.user;
  if (sessionUser) {
    (req as any).user = sessionUser;
    (res.locals as any).user = sessionUser;
    return next();
  }
  // JWT fallback (API akışıyla uyum için)
  const token = getTokenFromRequest(req);
  if (token) {
      try {
          const decoded = jwt.verify(token, getJwtSecret()) as DecodedToken;
          (req as any).user = decoded;
          (res.locals as any).user = decoded;
      } catch { /* geçersiz token: sessizce geç */ }
  }
  next();
}