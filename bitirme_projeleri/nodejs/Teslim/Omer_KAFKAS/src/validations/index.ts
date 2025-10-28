import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { errorResult } from '../models/result';

/**
 * Validation sonuçlarını kontrol eden middleware
 * Route'larda validation kurallarından sonra kullanılır
 * 
 * Örnek kullanım:
 * router.post('/register', registerValidation, validate, register);
 */
export const validate = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        // Tüm hata mesajlarını birleştir
        const errorMessages = errors.array().map(err => {
            // err.msg yerine err.msg kullanıyoruz çünkü withMessage() ile tanımladık
            return err.msg;
        }).join(', ');
        
        res.status(400).json(errorResult('Validasyon hatası', errorMessages));
        return;
    }
    
    next();
};

/**
 * Detaylı hata mesajları için alternatif validate
 * Her alan için ayrı hata mesajı döner
 */
export const validateDetailed = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map(err => ({
            field: err.type === 'field' ? (err as any).path : 'unknown',
            message: err.msg
        }));
        
        res.status(400).json({
            success: false,
            message: 'Validasyon hatası',
            errors: formattedErrors
        });
        return;
    }
    
    next();
};

// Tüm validator'ları buradan export et
export * from './authValidator';
export * from './newsValidator'; // ⬅️ EKLE
