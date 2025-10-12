import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jsonResult } from "../models/result";
import { eRoles } from "../utils/eRoles";

export const SECRET_KEY = process.env.JWT_SECRET || "supersecret123";

export interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

export function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).json(jsonResult(403, false, "Token missing", null));

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json(jsonResult(403, false, "Invalid token", null));
    req.user = user;
    next();
  });
}

export function checkRole(...roles: eRoles[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload;
    const hasRole = user.roles?.some((r: string) =>
      roles.map(rr => rr.toLowerCase()).includes(r.toLowerCase())
    );
    if (!hasRole) {
      return res.status(403).json(jsonResult(403, false, "Access denied.", null));
    }
    next();
  };
}