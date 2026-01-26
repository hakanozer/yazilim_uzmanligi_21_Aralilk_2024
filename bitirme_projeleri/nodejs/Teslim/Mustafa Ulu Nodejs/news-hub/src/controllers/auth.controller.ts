import { Request, Response, NextFunction } from "express";
import { registerService, loginService, refreshService, logoutService } from "../services/auth.service";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await registerService(req.body);
    return res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await loginService(req.body);
    return res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const profile = async (req: Request, res: Response) => {
  // requireAuth req.user ekliyor
  return res.status(200).json({ success: true, data: req.user });
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await refreshService(req.body);
    return res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId;
    const data = await logoutService(userId);
    return res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
