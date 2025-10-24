import { Request, Response } from 'express';
import { asyncHandler } from '../../middlewares/errorMiddleware';
import authService from '../../services/authService';

// GET - Sayfa render
export const loginPage = asyncHandler(async (req: Request, res: Response) => {
  res.render('auth/login', { 
    title: 'Login',
    error: null,
    user: null
  });
});

export const registerPage = asyncHandler(async (req: Request, res: Response) => {
  res.render('auth/register', { 
    title: 'Register',
    error: null,
    user: null
  });
});

// POST - Form işleme
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { user } = await authService.login(req.body);

    // ✅ Session'ı doğru şekilde ayarla
    req.session.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role
    };

    // ✅ Session'ı kaydetmeyi zorla
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.render('auth/login', {
          title: 'Login',
          error: 'Oturum kaydedilemedi',
          user: null
        });
      }
      res.redirect('/dashboard');
    });

  } catch (error: any) {
    res.render('auth/login', {
      title: 'Login',
      error: error.message,
      user: null
    });
  }
});

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { user } = await authService.register(req.body);

    // ✅ WEB'de session kullan
    req.session.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role
    };

    res.redirect('/dashboard');
  } catch (error: any) {
    res.render('auth/register', {
      title: 'Register',
      error: error.message,
      user: null
    });
  }
});

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Session destruction error:', err);
    }
    res.redirect('/');
  });
});