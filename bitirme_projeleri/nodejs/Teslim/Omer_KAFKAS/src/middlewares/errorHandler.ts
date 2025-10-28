import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

// Mongoose Cast Error (Geçersiz ID)
const handleCastErrorDB = (err: any): AppError => {
    const message = `Geçersiz ${err.path}: ${err.value}`;
    return new AppError(message, 400);
};

// Mongoose Duplicate Key Error
const handleDuplicateFieldsDB = (err: any): AppError => {
    const value = err.errmsg?.match(/(["'])(\\?.)*?\1/)?.[0];
    const message = `Duplicate field value: ${value}. Lütfen başka bir değer kullanın.`;
    return new AppError(message, 400);
};

// Mongoose Validation Error
const handleValidationErrorDB = (err: any): AppError => {
    const errors = Object.values(err.errors).map((el: any) => el.message);
    const message = `Geçersiz input verisi. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

// JWT Error
const handleJWTError = (): AppError => {
    return new AppError('Geçersiz token. Lütfen tekrar giriş yapın.', 401);
};

// JWT Expired Error
const handleJWTExpiredError = (): AppError => {
    return new AppError('Token süresi doldu. Lütfen tekrar giriş yapın.', 401);
};

// Development ortamında detaylı hata
const sendErrorDev = (err: AppError, req: Request, res: Response) => {
    // API
    if (req.originalUrl.startsWith('/api')) {
        return res.status(err.statusCode).json({
            success: false,
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    }

    // View (EJS)
    console.error('ERROR 💥', err);
    return res.status(err.statusCode).render('errors/500', {
        title: 'Bir Hata Oluştu',
        page: '500',
        message: err.message,
        error: err
    });
};

// Production ortamında güvenli hata
const sendErrorProd = (err: AppError, req: Request, res: Response) => {
    // API
    if (req.originalUrl.startsWith('/api')) {
        // Operational, trusted error: kullanıcıya gönder
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                success: false,
                status: err.status,
                message: err.message
            });
        }
        
        // Programming veya bilinmeyen hata: detay verme
        console.error('ERROR 💥', err);
        return res.status(500).json({
            success: false,
            status: 'error',
            message: 'Bir hata oluştu!'
        });
    }

    // View (EJS)
    if (err.isOperational) {
        return res.status(err.statusCode).render('errors/500', {
            title: 'Bir Hata Oluştu',
            page: '500',
            message: err.message
        });
    }
    
    // Programming veya bilinmeyen hata
    console.error('ERROR 💥', err);
    return res.status(err.statusCode).render('errors/500', {
        title: 'Bir Hata Oluştu',
        page: '500',
        message: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
    });
};

export const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
        error.message = err.message;

        // Mongoose hataları
        if (err.name === 'CastError') error = handleCastErrorDB(err);
        if (err.code === 11000) error = handleDuplicateFieldsDB(err);
        if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
        
        // JWT hataları
        if (err.name === 'JsonWebTokenError') error = handleJWTError();
        if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

        sendErrorProd(error, req, res);
    }
};

// 404 handler
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    const err = new AppError(`${req.originalUrl} adresi bulunamadı`, 404);
    next(err);
};
