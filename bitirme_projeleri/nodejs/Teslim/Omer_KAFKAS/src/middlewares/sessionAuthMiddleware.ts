import { Request, Response, NextFunction } from 'express';

// Session kontrolü - EJS sayfaları için
export const sessionAuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    if (req.session && req.session.userId) {
        // Session'da user varsa devam et
        next();
    } else {
        // Session yoksa login sayfasına yönlendir
        res.redirect('/login');
    }
};

// Optional session - Giriş yapmamış kullanıcılar da erişebilir
export const optionalSessionAuth = (req: Request, res: Response, next: NextFunction): void => {
    // Session varsa user bilgisini res.locals'a ekle (EJS'de kullanılabilir)
    if (req.session && req.session.user) {
        res.locals.user = req.session.user;
        res.locals.isAuthenticated = true;
    } else {
        res.locals.user = null;
        res.locals.isAuthenticated = false;
    }
    next();
};

// Admin kontrolü - Session bazlı
export const requireAdminSession = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.session || !req.session.userId) {
        res.redirect('/login');
        return;
    }
    
    if (req.session.user && req.session.user.role !== 'Admin') {
        res.status(403).render('errors/403', {
            title: '403 - Yetkisiz Erişim',
            page: '403',
            message: 'Bu sayfaya erişim yetkiniz yok!'
        });
        return;
    }
    
    next();
};

// Moderator veya Admin kontrolü
export const requireModeratorSession = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.session || !req.session.userId) {
        res.redirect('/login');
        return;
    }
    
    if (req.session.user && 
        req.session.user.role !== 'Admin' && 
        req.session.user.role !== 'Moderator') {
        res.status(403).render('errors/403', {
            title: '403 - Yetkisiz Erişim',
            page: '403',
            message: 'Bu sayfaya erişim yetkiniz yok!'
        });
        return;
    }
    
    next();
};
