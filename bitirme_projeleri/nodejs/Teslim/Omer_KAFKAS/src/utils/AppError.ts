export class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

// Önceden tanımlı hata sınıfları
export class ValidationError extends AppError {
    constructor(message: string = 'Validation hatası') {
        super(message, 400);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = 'Yetkisiz erişim') {
        super(message, 401);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = 'Bu işlem için yetkiniz yok') {
        super(message, 403);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = 'Kayıt bulunamadı') {
        super(message, 404);
    }
}

export class ConflictError extends AppError {
    constructor(message: string = 'Çakışma hatası') {
        super(message, 409);
    }
}

export class InternalServerError extends AppError {
    constructor(message: string = 'Sunucu hatası') {
        super(message, 500);
    }
}
