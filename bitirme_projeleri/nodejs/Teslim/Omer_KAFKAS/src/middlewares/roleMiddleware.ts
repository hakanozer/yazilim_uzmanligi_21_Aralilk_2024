import { eRoles } from "../utils/eRoles";
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtUtility";
import { errorResult } from "../models/result";
import UserDb from "../models/userModel";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
            userRole?: eRoles;
        }
    }
}

export const authWithRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers['authorization'];
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json(errorResult('Token bulunamadı! Lütfen giriş yapın.'));
            return;
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            res.status(401).json(errorResult('Token bulunamadı! Lütfen giriş yapın.'));
            return;
        }
        
        const decoded = verifyToken(token);
        
        req.userId = decoded.id;

        const user = await UserDb.findById(decoded.id);
        
        if (!user) {
            res.status(404).json(errorResult('Kullanıcı bulunamadı!'));
            return;
        }

        req.userRole = user.role;

        next();
    } catch (error) {
        console.error("Error in authWithRole middleware:", error);
        res.status(401).json(errorResult(
            'Geçersiz veya süresi dolmuş token!',
            error instanceof Error ? error.message : 'Bilinmeyen hata'
        ));
    }
};

export const requireRole = (...allowedRoles: eRoles[]) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            if (!req.userId) {
                res.status(401).json(errorResult('Kimlik doğrulama gerekli!'));
                return;
            }
            let userRole = req.userRole;
            
            if (!userRole) {
                const user = await UserDb.findById(req.userId);
                
                if (!user) {
                    res.status(404).json(errorResult('Kullanıcı bulunamadı!'));
                    return;
                }
                
                userRole = user.role;
                req.userRole = userRole;
            }
            if (!allowedRoles.includes(userRole)) {
                res.status(403).json(errorResult(
                    'Bu işlem için yetkiniz yok!',
                    `Gerekli roller: ${allowedRoles.join(', ')}`
                ));
                return;
            }

            next();
        } catch (error) {
            res.status(500).json(errorResult(
                'Sunucu hatası',
                error instanceof Error ? error.message : 'Bilinmeyen hata'
            ));
        }
    };
};
export const requireAdmin = requireRole(eRoles.Admin);
export const requireModerator = requireRole(eRoles.Moderator);
export const requireModeratorOrAdmin = requireRole(eRoles.Admin, eRoles.Moderator);
export const requireUser = requireRole(eRoles.User);
export const requireAnyRole = requireRole(eRoles.Admin, eRoles.Moderator, eRoles.User);
