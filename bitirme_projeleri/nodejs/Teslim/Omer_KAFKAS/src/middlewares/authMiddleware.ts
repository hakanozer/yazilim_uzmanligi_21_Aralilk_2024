import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwtUtility";
import { errorResult } from "../models/result";
import { eRoles } from "../utils/eRoles";


declare global {
    namespace Express {
        interface Request {
            userId?: string;
            userRole?: eRoles;
        }
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers['authorization'];
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json(errorResult('Lütfen giriş yapın.'));
            return;
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            res.status(401).json(errorResult('Lütfen giriş yapın.'));
            return;
        }

        // Token'ı doğrula
        const decoded = verifyToken(token);
        req.userId = decoded.id;

        // Kullanıcı bilgilerini getir (role için)
        const UserDb = (await import('../models/userModel')).default;
        const user = await UserDb.findById(decoded.id);
        
        if (user) {
            req.userRole = user.role;
        }

        next();
    } catch (error) {
        res.status(401).json(errorResult(
            'Geçersiz veya süresi dolmuş token!',
            error instanceof Error ? error.message : 'Bilinmeyen hata'
        ));
    }
};