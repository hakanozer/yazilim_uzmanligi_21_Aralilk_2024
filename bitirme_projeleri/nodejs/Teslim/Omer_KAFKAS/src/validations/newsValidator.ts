import { body } from 'express-validator';

// Create News Validation
export const createNewsValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Başlık gerekli')
        .isLength({ min: 10, max: 200 }).withMessage('Başlık 10-200 karakter arası olmalı'),
    
    body('content')
        .trim()
        .notEmpty().withMessage('İçerik gerekli')
        .isLength({ min: 50, max: 10000 }).withMessage('İçerik 50-10000 karakter arası olmalı'),
    
    body('category')
        .optional()
        .trim()
        .isIn(['Teknoloji', 'Spor', 'Ekonomi', 'Sağlık', 'Eğitim', 'Gündem', 'Diğer']).withMessage('Geçersiz kategori'),
    
    body('image')
        .optional()
        .trim()
        .isURL().withMessage('Geçerli bir URL girin')
];

// Update News Validation
export const updateNewsValidation = [
    body('title')
        .optional()
        .trim()
        .isLength({ min: 10, max: 200 }).withMessage('Başlık 10-200 karakter arası olmalı'),
    
    body('content')
        .optional()
        .trim()
        .isLength({ min: 50, max: 10000 }).withMessage('İçerik 50-10000 karakter arası olmalı'),
    
    body('category')
        .optional()
        .trim()
        .isIn(['Teknoloji', 'Spor', 'Ekonomi', 'Sağlık', 'Eğitim', 'Gündem', 'Diğer']).withMessage('Geçersiz kategori'),
    
    body('image')
        .optional()
        .trim()
        .isURL().withMessage('Geçerli bir URL girin')
];

// Change News Status Validation
export const changeStatusValidation = [
    body('status')
        .trim()
        .notEmpty().withMessage('Durum gerekli')
        .isIn(['draft', 'published']).withMessage('Durum "draft" veya "published" olmalı')
];
