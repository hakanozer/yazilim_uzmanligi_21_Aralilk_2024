import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

type JwtPayload = {
  userId: string;
  role: "admin" | "user";
  iat?: number;
  exp?: number;
};

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is missing in .env");
  return secret;
};

// Request'e user bilgisini eklemek için type genişletme
declare global {
  namespace Express {
    interface Request {
      user?: { userId: string; role: "admin" | "user" };
    }
  }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization; // "Bearer <token>"
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: Missing Bearer token" });
    }

    const token = authHeader.substring("Bearer ".length).trim();
    const payload = jwt.verify(token, getJwtSecret()) as JwtPayload;

    req.user = { userId: payload.userId, role: payload.role };
    return next();
  } catch {
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};
