"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentUpdateRules = exports.commentCreateRules = exports.reactionParamRules = exports.searchQueryRules = exports.categoryCreateRules = exports.newsUpdateRules = exports.newsCreateRules = exports.blogTogglePublishRules = exports.blogUpdateRules = exports.blogCreateRules = exports.profileChangePasswordRules = exports.profileUpdateInfoRules = exports.authRegisterRules = exports.authLoginRules = exports.validateObjectIdParam = void 0;
exports.handleValidation = handleValidation;
const express_validator_1 = require("express-validator");
const express_validator_2 = require("express-validator");
const validators_1 = require("../utils/validators");
// Ortak: ObjectId param doğrulama
exports.validateObjectIdParam = [
    (0, express_validator_1.param)('id').isMongoId().withMessage('Geçersiz ID parametresi')
];
// Auth: login/register
exports.authLoginRules = [
    (0, express_validator_1.body)('email').isString().trim().notEmpty().withMessage('E‑posta gerekli')
        .custom((v) => (0, validators_1.isValidEmail)(v)).withMessage('Geçerli bir e‑posta girin'),
    (0, express_validator_1.body)('password').isString().notEmpty().withMessage('Şifre gerekli')
];
exports.authRegisterRules = [
    (0, express_validator_1.body)('name').isString().trim().isLength({ min: 2 }).withMessage('Ad en az 2 karakter olmalı'),
    (0, express_validator_1.body)('email').isString().trim().notEmpty().withMessage('E‑posta gerekli')
        .custom((v) => (0, validators_1.isValidEmail)(v)).withMessage('Geçerli bir e‑posta girin'),
    (0, express_validator_1.body)('password').isString().notEmpty().withMessage('Şifre gerekli')
        .custom((v) => (0, validators_1.isValidPassword)(v)).withMessage('Şifre en az 8 karakter olmalı'),
    (0, express_validator_1.body)('createdAt').not().exists().withMessage('createdAt gönderilemez'),
    (0, express_validator_1.body)('updatedAt').not().exists().withMessage('updatedAt gönderilemez'),
    // roles sadece admin tarafından ayarlanabilir
    (0, express_validator_1.body)('roles').optional().custom((val) => {
        if (Array.isArray(val))
            return val.every((r) => r === 'user' || r === 'admin');
        if (typeof val === 'string')
            return true;
        throw new Error('roles string veya dizi olmalı');
    }),
];
// Profil: ad/e‑posta güncelleme ve şifre değiştirme
exports.profileUpdateInfoRules = [
    (0, express_validator_1.body)('name').optional().isString().trim().isLength({ min: 2 }).withMessage('Ad en az 2 karakter olmalı'),
    (0, express_validator_1.body)('email').optional().isString().trim()
        .custom((v) => (0, validators_1.isValidEmail)(v)).withMessage('Geçerli bir e‑posta girin'),
    (0, express_validator_1.body)('createdAt').not().exists().withMessage('createdAt gönderilemez'),
    (0, express_validator_1.body)('updatedAt').not().exists().withMessage('updatedAt gönderilemez')
];
exports.profileChangePasswordRules = [
    (0, express_validator_1.body)('currentPassword').isString().notEmpty().withMessage('Mevcut şifre gerekli'),
    (0, express_validator_1.body)('newPassword').isString().notEmpty().withMessage('Yeni şifre gerekli')
        .custom((v) => (0, validators_1.isValidPassword)(v)).withMessage('Şifre en az 8 karakter olmalı'),
    (0, express_validator_1.body)('createdAt').not().exists().withMessage('createdAt gönderilemez'),
    (0, express_validator_1.body)('updatedAt').not().exists().withMessage('updatedAt gönderilemez')
];
// Blog: create/update/publish
exports.blogCreateRules = [
    (0, express_validator_1.body)('title').isString().trim().notEmpty().withMessage('Başlık zorunlu'),
    (0, express_validator_1.body)('content').isString().trim().notEmpty().withMessage('İçerik zorunlu'),
    (0, express_validator_1.body)('coverImageUrl').optional({ nullable: true }).isString().isLength({ max: 2048 }).withMessage('coverImageUrl çok uzun'),
    (0, express_validator_1.body)('tags').optional().custom((val) => {
        if (Array.isArray(val))
            return val.every((t) => typeof t === 'string');
        if (typeof val === 'string')
            return true;
        throw new Error('tags string veya dizi olmalı');
    }),
    (0, express_validator_1.body)('categories').optional().custom((val) => {
        if (Array.isArray(val))
            return val.every((c) => /^[0-9a-fA-F]{24}$/.test(String(c)));
        if (typeof val === 'string')
            return true;
        throw new Error('categories string veya ObjectId dizisi olmalı');
    }),
    (0, express_validator_1.body)('isPublished').optional().isBoolean().withMessage('isPublished boolean olmalı').toBoolean()
];
exports.blogUpdateRules = [
    (0, express_validator_1.body)('title').optional().isString().trim().notEmpty().withMessage('Başlık boş olamaz'),
    (0, express_validator_1.body)('content').optional().isString().trim().notEmpty().withMessage('İçerik boş olamaz'),
    (0, express_validator_1.body)('coverImageUrl').optional({ nullable: true }).isString().isLength({ max: 2048 }).withMessage('coverImageUrl çok uzun'),
    (0, express_validator_1.body)('tags').optional().custom((val) => {
        if (Array.isArray(val))
            return val.every((t) => typeof t === 'string');
        if (typeof val === 'string')
            return true;
        throw new Error('tags string veya dizi olmalı');
    }),
    (0, express_validator_1.body)('categories').optional().custom((val) => {
        if (Array.isArray(val))
            return val.every((c) => /^[0-9a-fA-F]{24}$/.test(String(c)));
        if (typeof val === 'string')
            return true;
        throw new Error('categories string veya ObjectId dizisi olmalı');
    }),
    (0, express_validator_1.body)('isPublished').optional().isBoolean().withMessage('isPublished boolean olmalı').toBoolean()
];
exports.blogTogglePublishRules = [
    (0, express_validator_1.param)('id').isMongoId().withMessage('Geçersiz ID parametresi'),
    (0, express_validator_1.body)('publish').isBoolean().withMessage('publish alanı (true/false) gerekli').toBoolean()
];
// News: create/update
exports.newsCreateRules = [
    (0, express_validator_1.body)('title').isString().trim().isLength({ min: 2 }).withMessage('Başlık en az 2 karakter olmalı'),
    (0, express_validator_1.body)('content').isString().trim().isLength({ min: 150, max: 4000 }).withMessage('İçerik 150–4000 karakter olmalı'),
    (0, express_validator_1.body)('imageUrl').optional({ nullable: true }).isString().isLength({ max: 2048 }).withMessage('imageUrl çok uzun'),
    (0, express_validator_1.body)('category').optional({ nullable: true }).isMongoId().withMessage('Geçersiz kategori ID'),
    (0, express_validator_1.body)('isActive').optional().isBoolean().withMessage('isActive boolean olmalı').toBoolean()
];
exports.newsUpdateRules = [
    (0, express_validator_1.body)('title').optional().isString().trim().isLength({ min: 2 }).withMessage('Başlık en az 2 karakter olmalı'),
    (0, express_validator_1.body)('content').optional().isString().trim().isLength({ min: 150, max: 4000 }).withMessage('İçerik 150–4000 karakter olmalı'),
    (0, express_validator_1.body)('imageUrl').optional({ nullable: true }).isString().isLength({ max: 2048 }).withMessage('imageUrl çok uzun'),
    (0, express_validator_1.body)('category').optional({ nullable: true }).isMongoId().withMessage('Geçersiz kategori ID'),
    (0, express_validator_1.body)('isActive').optional().isBoolean().withMessage('isActive boolean olmalı').toBoolean()
];
// Categories: create
exports.categoryCreateRules = [
    (0, express_validator_1.body)('name').isString().trim().notEmpty().withMessage('Kategori adı zorunlu'),
    (0, express_validator_1.body)('description').optional().isString().isLength({ max: 4000 }).withMessage('description çok uzun'),
    (0, express_validator_1.body)('kind').optional().isIn(['news', 'blog', 'both']).withMessage('kind news/blog/both olmalı'),
    (0, express_validator_1.body)('isActive').optional().isBoolean().withMessage('isActive boolean olmalı').toBoolean()
];
// Arama: q parametresi
exports.searchQueryRules = [
    (0, express_validator_1.query)('q').optional().isString().trim().isLength({ min: 2, max: 120 }).withMessage('Arama en az 2 karakter olmalı')
];
// Reaksiyonlar: sadece id doğrula
exports.reactionParamRules = [
    (0, express_validator_1.param)('id').isMongoId().withMessage('Geçersiz ID parametresi')
];
// Comment: create/update
exports.commentCreateRules = [
    (0, express_validator_1.body)('content').isString().trim().isLength({ min: 1, max: 2000 }).withMessage('Yorum 1–2000 karakter olmalı'),
    (0, express_validator_1.body)('subjectModel').isString().isIn(['Blog', 'News']).withMessage('subjectModel Blog veya News olmalı'),
    (0, express_validator_1.body)('subject').isMongoId().withMessage('Geçersiz subject id'),
    (0, express_validator_1.body)('author').not().exists().withMessage('author gönderilemez'),
    (0, express_validator_1.body)('isActive').not().exists().withMessage('isActive sadece admin tarafından ayarlanabilir'),
    (0, express_validator_1.body)('createdAt').not().exists().withMessage('createdAt gönderilemez'),
    (0, express_validator_1.body)('updatedAt').not().exists().withMessage('updatedAt gönderilemez')
];
exports.commentUpdateRules = [
    (0, express_validator_1.body)('content').optional().isString().trim().isLength({ min: 1, max: 2000 }).withMessage('Yorum 1–2000 karakter olmalı'),
    (0, express_validator_1.body)('isActive').optional().isBoolean().withMessage('isActive boolean olmalı')
        .custom((_, { req }) => {
        const roles = req.user?.roles || [];
        if (!Array.isArray(roles) || !roles.includes('admin')) {
            throw new Error('isActive sadece admin tarafından değiştirilebilir');
        }
        return true;
    }),
    (0, express_validator_1.body)('author').not().exists().withMessage('author gönderilemez'),
    (0, express_validator_1.body)('subjectModel').not().exists().withMessage('subjectModel güncellenemez'),
    (0, express_validator_1.body)('subject').not().exists().withMessage('subject güncellenemez'),
    (0, express_validator_1.body)('createdAt').not().exists().withMessage('createdAt gönderilemez'),
    (0, express_validator_1.body)('updatedAt').not().exists().withMessage('updatedAt gönderilemez')
];
// Son: doğrulama sonuçlarını ele alan middleware
function handleValidation(req, res, next) {
    const result = (0, express_validator_2.validationResult)(req);
    if (result.isEmpty())
        return next();
    const errorsArr = result.array();
    const details = errorsArr.map((e) => e.msg);
    const isIdParamError = errorsArr.some((e) => e.type === 'field' && e.location === 'params' && e.path === 'id');
    const payload = isIdParamError
        ? { error: 'Geçersiz ID parametresi', code: 'CAST_ERROR', details }
        : { error: 'Validasyon hatası', code: 'VALIDATION_ERROR', details };
    // API algılama: originalUrl/baseUrl/path hepsini kontrol et
    const isApi = String(req.originalUrl || req.url || '').startsWith('/api') ||
        String(req.baseUrl || '').startsWith('/api') ||
        String(req.path || '').startsWith('/api');
    if (isApi) {
        return res.status(400).json(payload);
    }
    return res.status(400).render('errors/500', {
        title: payload.error,
        message: details.join(', '),
        stack: undefined
    });
}
