import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

export interface JwtUser {
  _id: string;
  role: 'user' | 'admin';
}

export const authJWT = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers['authorization'] || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const secret = process.env.JWT_SECRET || 'jwt_secret_123';
    const payload = jwt.verify(token, secret) as JwtUser;
    (req as any).jwtUser = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};