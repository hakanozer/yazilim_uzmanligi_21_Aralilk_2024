"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = notFoundHandler;
exports.errorHandler = errorHandler;
function isJsonParseError(err) {
    return err?.type === 'entity.parse.failed' ||
        (err instanceof SyntaxError && err.status === 400 && 'body' in err);
}
function toHttpStatus(err) {
    if (isJsonParseError(err))
        return 400;
    if (typeof err?.status === 'number')
        return err.status;
    if (err?.name === 'ValidationError')
        return 400;
    if (err?.name === 'CastError')
        return 400;
    return 500;
}
function toApiPayload(err) {
    if (isJsonParseError(err)) {
        return {
            error: 'Geçersiz JSON',
            code: 'INVALID_JSON',
            details: [
                `JSON gövde parse edilemedi: ${err?.message || 'geçersiz JSON'}`,
                'Anahtarlar ve stringler çift tırnakla yazılmalı',
                'İçerideki çift tırnakları \\" olarak kaçırın',
                'Fazladan virgülleri ve yorum satırlarını kullanmayın'
            ]
        };
    }
    if (err?.name === 'ValidationError' && err?.errors) {
        return {
            error: 'Validasyon hatası',
            code: 'VALIDATION_ERROR',
            details: Object.values(err.errors).map((e) => e.message)
        };
    }
    if (err?.name === 'CastError') {
        return { error: 'Geçersiz ID parametresi', code: 'CAST_ERROR' };
    }
    return { error: err?.message || 'Beklenmeyen hata' };
}
function isApiRequest(req) {
    const url = String(req.originalUrl || req.url || '');
    const base = String(req.baseUrl || '');
    const path = String(req.path || '');
    return url.startsWith('/api') || base.startsWith('/api') || path.startsWith('/api');
}
function notFoundHandler(req, res, next) {
    if (isApiRequest(req)) {
        return next(Object.assign(new Error('Endpoint bulunamadı'), { status: 404 }));
    }
    return res.status(404).render('errors/404', { title: '404 - Sayfa Bulunamadı' });
}
function errorHandler(err, req, res, _next) {
    const isApi = isApiRequest(req);
    const status = toHttpStatus(err);
    if (process.env.NODE_ENV !== 'test') {
        console.error(`[Error] ${req.method} ${req.originalUrl} -> ${status}:`, err);
    }
    if (isApi) {
        return res.status(status).json(toApiPayload(err));
    }
    const message = isJsonParseError(err) ? 'Geçersiz JSON gövde' : (err?.message || 'Beklenmeyen hata');
    return res
        .status(status >= 400 ? status : 500)
        .render('errors/500', {
        title: isJsonParseError(err) ? 'Geçersiz JSON' : 'Sunucu Hatası',
        message,
        stack: process.env.NODE_ENV === 'development' ? err?.stack : undefined
    });
}
