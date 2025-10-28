import { body, param } from 'express-validator';

// Yorum Oluşturma Validation
export const createCommentValidation = [
    param('newsId')
        .notEmpty().withMessage('Haber ID gerekli')
        .isMongoId().withMessage('Geçerli bir haber ID girin'),
    
    body('content')
        .trim()
        .notEmpty().withMessage('Yorum içeriği gerekli')
        .isLength({ min: 1, max: 1000 }).withMessage('Yorum 1-1000 karakter arası olmalı')
];

// Yorum Güncelleme Validation
export const updateCommentValidation = [
    param('id')
        .notEmpty().withMessage('Yorum ID gerekli')
        .isMongoId().withMessage('Geçerli bir yorum ID girin'),
    
    body('content')
        .trim()
        .notEmpty().withMessage('Yorum içeriği gerekli')
        .isLength({ min: 1, max: 1000 }).withMessage('Yorum 1-1000 karakter arası olmalı')
];

// Yorum ID Validation
export const commentIdValidation = [
    param('id')
        .notEmpty().withMessage('Yorum ID gerekli')
        .isMongoId().withMessage('Geçerli bir yorum ID girin')
];

// News ID Validation
export const newsIdValidation = [
    param('newsId')
        .notEmpty().withMessage('Haber ID gerekli')
        .isMongoId().withMessage('Geçerli bir haber ID girin')
];
