import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jsonResult } from "../models/result";
import { eRoles } from "../utils/eRoles";


export const SECRET_KEY = process.env.SECRET_KEY || 'your_secret'

export interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

export function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const result = jsonResult(403, false, "Token empty!", null);
  if (!authHeader) return res.status(403).json(result)

  const token = authHeader.split(" ")[1];
  const result2 = jsonResult(403, false, "Token missing!", null);
  if (!token) return res.status(403).json(result2);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    const result3 = jsonResult(403, false, "Token invalid!", null);
    if (err) return res.status(403).json(result3);
    req.user = user;
    next();
  });
}

export function checkRole(...roles: eRoles[]) { //birden fazla parametreyi tek bir roles dizisinde topladık.
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload;
    const userRoles = user.roles;
    // Kullanıcının rolleri roles dizisinde var mı kontrolü
    const hasRole = userRoles
      .map(r => r.toLowerCase())
      .some(r => roles.map(rr => rr.toLowerCase()).includes(r));
    if (!hasRole) {
      const result = jsonResult(403, false, "You do not have permission for this action", null);
      return res.status(403).json(result);
    }
    next();
  };
}