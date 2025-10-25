import { body, param, query } from 'express-validator';
import { validationResult } from 'express-validator';
import { isValidEmail, isValidPassword } from '../utils/validators';

// Ortak: ObjectId param doğrulama
export const validateObjectIdParam = [
  param('id').isMongoId().withMessage('Geçersiz ID parametresi')
];

// Auth: login/register
export const authLoginRules = [
  body('email').isString().trim().notEmpty().withMessage('E‑posta gerekli')
    .custom((v) => isValidEmail(v)).withMessage('Geçerli bir e‑posta girin'),
  body('password').isString().notEmpty().withMessage('Şifre gerekli')
];

export const authRegisterRules = [
  body('name').isString().trim().isLength({ min: 2 }).withMessage('Ad en az 2 karakter olmalı'),
  body('email').isString().trim().notEmpty().withMessage('E‑posta gerekli')
    .custom((v) => isValidEmail(v)).withMessage('Geçerli bir e‑posta girin'),
  body('password').isString().notEmpty().withMessage('Şifre gerekli')
    .custom((v) => isValidPassword(v)).withMessage('Şifre en az 8 karakter olmalı'),
  body('createdAt').not().exists().withMessage('createdAt gönderilemez'),
  body('updatedAt').not().exists().withMessage('updatedAt gönderilemez'),
  // roles sadece admin tarafından ayarlanabilir
  body('roles').optional().custom((val) => {
    if (Array.isArray(val)) return val.every((r) => r === 'user' || r === 'admin');
    if (typeof val === 'string') return true;
    throw new Error('roles string veya dizi olmalı');
  }),
];

// Profil: ad/e‑posta güncelleme ve şifre değiştirme
export const profileUpdateInfoRules = [
  body('name').optional().isString().trim().isLength({ min: 2 }).withMessage('Ad en az 2 karakter olmalı'),
  body('email').optional().isString().trim()
    .custom((v) => isValidEmail(v)).withMessage('Geçerli bir e‑posta girin'),
  body('createdAt').not().exists().withMessage('createdAt gönderilemez'),
  body('updatedAt').not().exists().withMessage('updatedAt gönderilemez')
];

export const profileChangePasswordRules = [
  body('currentPassword').isString().notEmpty().withMessage('Mevcut şifre gerekli'),
  body('newPassword').isString().notEmpty().withMessage('Yeni şifre gerekli')
    .custom((v) => isValidPassword(v)).withMessage('Şifre en az 8 karakter olmalı'),
  body('createdAt').not().exists().withMessage('createdAt gönderilemez'),
  body('updatedAt').not().exists().withMessage('updatedAt gönderilemez')
];

// Blog: create/update/publish
export const blogCreateRules = [
  body('title').isString().trim().notEmpty().withMessage('Başlık zorunlu'),
  body('content').isString().trim().notEmpty().withMessage('İçerik zorunlu'),
  body('coverImageUrl').optional({ nullable: true }).isString().isLength({ max: 2048 }).withMessage('coverImageUrl çok uzun'),
  body('tags').optional().custom((val) => {
    if (Array.isArray(val)) return val.every((t) => typeof t === 'string');
    if (typeof val === 'string') return true;
    throw new Error('tags string veya dizi olmalı');
  }),
  body('categories').optional().custom((val) => {
    if (Array.isArray(val)) return val.every((c) => /^[0-9a-fA-F]{24}$/.test(String(c)));
    if (typeof val === 'string') return true;
    throw new Error('categories string veya ObjectId dizisi olmalı');
  }),
  body('isPublished').optional().isBoolean().withMessage('isPublished boolean olmalı').toBoolean()
];

export const blogUpdateRules = [
  body('title').optional().isString().trim().notEmpty().withMessage('Başlık boş olamaz'),
  body('content').optional().isString().trim().notEmpty().withMessage('İçerik boş olamaz'),
  body('coverImageUrl').optional({ nullable: true }).isString().isLength({ max: 2048 }).withMessage('coverImageUrl çok uzun'),
  body('tags').optional().custom((val) => {
    if (Array.isArray(val)) return val.every((t) => typeof t === 'string');
    if (typeof val === 'string') return true;
    throw new Error('tags string veya dizi olmalı');
  }),
  body('categories').optional().custom((val) => {
    if (Array.isArray(val)) return val.every((c) => /^[0-9a-fA-F]{24}$/.test(String(c)));
    if (typeof val === 'string') return true;
    throw new Error('categories string veya ObjectId dizisi olmalı');
  }),
  body('isPublished').optional().isBoolean().withMessage('isPublished boolean olmalı').toBoolean()
];

export const blogTogglePublishRules = [
  param('id').isMongoId().withMessage('Geçersiz ID parametresi'),
  body('publish').isBoolean().withMessage('publish alanı (true/false) gerekli').toBoolean()
];

// News: create/update
export const newsCreateRules = [
  body('title').isString().trim().isLength({ min: 2 }).withMessage('Başlık en az 2 karakter olmalı'),
  body('content').isString().trim().isLength({ min: 150, max: 4000 }).withMessage('İçerik 150–4000 karakter olmalı'),
  body('imageUrl').optional({ nullable: true }).isString().isLength({ max: 2048 }).withMessage('imageUrl çok uzun'),
  body('category').optional({ nullable: true }).isMongoId().withMessage('Geçersiz kategori ID'),
  body('isActive').optional().isBoolean().withMessage('isActive boolean olmalı').toBoolean()
];

export const newsUpdateRules = [
  body('title').optional().isString().trim().isLength({ min: 2 }).withMessage('Başlık en az 2 karakter olmalı'),
  body('content').optional().isString().trim().isLength({ min: 150, max: 4000 }).withMessage('İçerik 150–4000 karakter olmalı'),
  body('imageUrl').optional({ nullable: true }).isString().isLength({ max: 2048 }).withMessage('imageUrl çok uzun'),
  body('category').optional({ nullable: true }).isMongoId().withMessage('Geçersiz kategori ID'),
  body('isActive').optional().isBoolean().withMessage('isActive boolean olmalı').toBoolean()
];

// Categories: create
export const categoryCreateRules = [
  body('name').isString().trim().notEmpty().withMessage('Kategori adı zorunlu'),
  body('description').optional().isString().isLength({ max: 4000 }).withMessage('description çok uzun'),
  body('kind').optional().isIn(['news', 'blog', 'both']).withMessage('kind news/blog/both olmalı'),
  body('isActive').optional().isBoolean().withMessage('isActive boolean olmalı').toBoolean()
];

// Arama: q parametresi
export const searchQueryRules = [
  query('q').optional().isString().trim().isLength({ min: 2, max: 120 }).withMessage('Arama en az 2 karakter olmalı')
];

// Reaksiyonlar: sadece id doğrula
export const reactionParamRules = [
  param('id').isMongoId().withMessage('Geçersiz ID parametresi')
];

// Comment: create/update
export const commentCreateRules = [
  body('content').isString().trim().isLength({ min: 1, max: 2000 }).withMessage('Yorum 1–2000 karakter olmalı'),
  body('subjectModel').isString().isIn(['Blog', 'News']).withMessage('subjectModel Blog veya News olmalı'),
  body('subject').isMongoId().withMessage('Geçersiz subject id'),
  body('author').not().exists().withMessage('author gönderilemez'),
  body('isActive').not().exists().withMessage('isActive sadece admin tarafından ayarlanabilir'),
  body('createdAt').not().exists().withMessage('createdAt gönderilemez'),
  body('updatedAt').not().exists().withMessage('updatedAt gönderilemez')
];

export const commentUpdateRules = [
  body('content').optional().isString().trim().isLength({ min: 1, max: 2000 }).withMessage('Yorum 1–2000 karakter olmalı'),
  body('isActive').optional().isBoolean().withMessage('isActive boolean olmalı')
    .custom((_, { req }) => {
      const roles = (req as any).user?.roles || [];
      if (!Array.isArray(roles) || !roles.includes('admin')) {
        throw new Error('isActive sadece admin tarafından değiştirilebilir');
      }
      return true;
    }),
  body('author').not().exists().withMessage('author gönderilemez'),
  body('subjectModel').not().exists().withMessage('subjectModel güncellenemez'),
  body('subject').not().exists().withMessage('subject güncellenemez'),
  body('createdAt').not().exists().withMessage('createdAt gönderilemez'),
  body('updatedAt').not().exists().withMessage('updatedAt gönderilemez')
];

// Son: doğrulama sonuçlarını ele alan middleware
export function handleValidation(req: any, res: any, next: any) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();

  const errorsArr = result.array();
  const details = errorsArr.map((e) => e.msg);
  const isIdParamError = errorsArr.some(
    (e) => e.type === 'field' && e.location === 'params' && e.path === 'id'
  );

  const payload = isIdParamError
    ? { error: 'Geçersiz ID parametresi', code: 'CAST_ERROR', details }
    : { error: 'Validasyon hatası', code: 'VALIDATION_ERROR', details };

  // API algılama: originalUrl/baseUrl/path hepsini kontrol et
  const isApi =
    String(req.originalUrl || req.url || '').startsWith('/api') ||
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