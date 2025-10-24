import { Request, Response } from 'express';
import { AuthRequest } from '../../middlewares/authMiddleware';
import { asyncHandler } from '../../middlewares/errorMiddleware';
import authService from '../../services/authService';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { user, token, refreshToken } = await authService.register(req.body);

  res.status(201).json({
    status: 'success',
    message: 'User registered successfully',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token,
      refreshToken
    }
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { user, token, refreshToken } = await authService.login(req.body);

  // ✅ API'de session YOK, sadece token
  res.json({
    status: 'success',
    message: 'Login successful',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token,
      refreshToken
    }
  });
});

export const getProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      status: 'error',
      message: 'User not authenticated'
    });
  }

  const user = await authService.getProfile(req.user._id.toString());

  res.json({
    status: 'success',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    }
  });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.json({
    status: 'success',
    message: 'Logout successful - Please remove token from client'
  });
});