
import e, { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jsonResult } from "../models/result";
import { eRoles } from "../utils/enumRole";


// secret key environment variable'dan alınır, yoksa varsayılan bir değer kullanılır
export const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

// Request tipini genişletiyoruz
export interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

export function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const result =  jsonResult(403, false, "Token is required", null);
  if (!authHeader) return res.status(403).json(result)

  const token = authHeader.split(" ")[1];
  const result2 = jsonResult(403, false, "Token is missing", null);
  if (!token) return res.status(403).json(result2)

  jwt.verify(token, SECRET_KEY, (err, user) => {
    const result3 = jsonResult(403, false, "Invalid token", null);
    if (err) return res.status(403).json(result3)
    req.user = user;
    next();
  });
}

export function checkRole(...roles: eRoles[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload;

    // Kullanıcı veya rol bilgisi yoksa yetki reddedilir
    if (!user || !Array.isArray((user as any).roles)) {
      const result = jsonResult(403, false, "You do not have permission for this action", null);
      return res.status(403).json(result);
    }

    const userRoles: string[] = (user as any).roles;
    const hasRequiredRole = roles.some((r) => userRoles.includes(r));

    if (!hasRequiredRole) {
      const result4 = jsonResult(403, false, "You do not have permission for this action", null);
      return res.status(403).json(result4);
    }
    next();
  };
}
