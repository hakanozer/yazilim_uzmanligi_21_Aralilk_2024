import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { dataResult } from '../services/result';
import { eRoles } from '../utils/eRoles';

// Secret key
export const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_secret_key';

// AuthRequest interface - auth.ts ile uyumlu
export interface AuthRequest extends Request {
    user?: string | JwtPayload;
}

// Token doğrulama middleware - auth.ts ile aynı yapı
export function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const result = dataResult(403, false, 'Token is empty', null);
    if (!authHeader) return res.status(403).json(result);

    const token = authHeader.split(' ')[1];
    const result2 = dataResult(403, false, 'Token is missing!', null);
    if (!token) return res.status(403).json(result2);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        const result3 = dataResult(403, false, 'Token is invalid!', null);
        if (err) return res.status(403).json(result3);
        req.user = user;
        next();
    });
}

// Rol kontrolü middleware - auth.ts ile aynı yapı
export function checkRole(...roles: eRoles[]) {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        const user = req.user as JwtPayload;
        const userRoles = user.roles;
        const hasRole = userRoles
            .map((r: string) => r.toLowerCase())
            .some((r: string) => roles.map(rr => rr.toLowerCase()).includes(r));
        if (!hasRole) {
            const result = dataResult(403, false, 'You do not have permission to access this resource', null);
            return res.status(403).json(result);
        }
        next();
    };
}

// Admin yetkisi kontrolü - kolaylık için
export const requireAdmin = checkRole(eRoles.Admin);

// Kullanıcı yetkisi kontrolü - kolaylık için
export const requireUser = checkRole(eRoles.User, eRoles.Admin);

// Backward compatibility için eski fonksiyon (opsiyonel)
export const authenticateToken = verifyToken;