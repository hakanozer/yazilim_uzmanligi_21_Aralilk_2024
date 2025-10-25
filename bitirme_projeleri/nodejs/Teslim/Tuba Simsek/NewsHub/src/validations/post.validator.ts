import { body } from 'express-validator';
import { PostCategory } from '../models/postModel';

// Hem yeni post hem de güncelleme için ortak kurallar
const commonPostValidationRules = [
    // 1. 'title' alanı için kurallar
    body('title')
        .trim()
        .notEmpty().withMessage('Başlık alanı boş bırakılamaz.')
        .isLength({ min: 5, max: 150 }).withMessage('Başlık 5 ile 150 karakter arasında olmalıdır.'),

    // 2. 'content' alanı için kurallar
    body('content')
        .trim()
        .notEmpty().withMessage('İçerik alanı boş bırakılamaz.')
        .isLength({ min: 10 }).withMessage('İçerik en az 10 karakter uzunluğunda olmalıdır.'),

    // 3. 'category' alanı için kurallar
    body('category')
        .notEmpty().withMessage('Kategori seçimi zorunludur.')
        .isIn(Object.values(PostCategory)).withMessage('Geçersiz kategori seçimi.')
];

// Yeni post oluşturma için (şimdilik ortak kurallarla aynı)
export const createPostValidationRules = () => {
    return [
        ...commonPostValidationRules
        // İleride buraya sadece yeni post için geçerli ek kurallar gelebilir
    ];
};

// Post güncelleme için (şimdilik ortak kurallarla aynı)
export const updatePostValidationRules = () => {
    return [
        ...commonPostValidationRules
        // İleride buraya sadece güncelleme için geçerli ek kurallar gelebilir
    ];
};