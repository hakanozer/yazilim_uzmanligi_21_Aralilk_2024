import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { Types } from 'mongoose';

// Session user type tanımı - SADECE BURADA YAP
declare module 'express-session' {
  interface SessionData {
    user?: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  }
}

export interface AuthRequest extends Request {
  user?: IUser & {
    _id: Types.ObjectId;
  };
}

// JWT Authentication for API
export const authenticateJWT = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Token is valid but user no longer exists.'
      });
    }

    req.user = user as IUser & { _id: Types.ObjectId };
    next();
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Invalid token.'
    });
  }
};

// Session Authentication for Views
export const authenticateSession = (req: Request, res: Response, next: NextFunction) => {
  console.log('Session check:', req.session.user); // Debug
  if (req.session.user && req.session.user.id) {
    next();
  } else {
    res.redirect('/auth/login');
  }
};

// Admin authorization middleware
export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Access denied. Admin role required.'
    });
  }
  next();
};