/*
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const SECRET_KEY = "mysecretkey"; // normalde .env’de saklanır

// Request tipini genişletiyoruz
export interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

export function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).json({ message: "Token gerekli" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Token eksik" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Geçersiz token" });
    req.user = user;
    next();
  });
}

export function checkRole(role: string) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload;
    if (user.role !== role) {
      return res.status(403).json({ message: "Bu işlem için yetkiniz yok" });
    }
    next();
  };
}
*/