import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jsonResult } from "../models/result";


export const SECRET_KEY = process.env.SECRET_KEY || 'your_secret'

export interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

export function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return jsonResult(403, false, "Token empty!", null);

  const token = authHeader.split(" ")[1];
  if (!token) return jsonResult(403, false, "Token missing!", null);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return jsonResult(403, false, "Invalid token", null);
    req.user = user;
    next();
  });
}

export function checkRole(role: string) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload;
    if (user.role !== role) {
      return jsonResult(403, false, "You do not have permission for this action", null);
    }
    next();
  };
}
