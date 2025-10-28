import { body } from 'express-validator';

// Register Validation
export const registerValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('İsim gerekli')
        .isLength({ min: 3, max: 50 }).withMessage('İsim 3-50 karakter arası olmalı')
        .matches(/^[a-zA-ZğüşöçıİĞÜŞÖÇ\s]+$/).withMessage('İsim sadece harf içerebilir'),
    
    body('email')
        .trim()
        .notEmpty().withMessage('Email gerekli')
        .isEmail().withMessage('Geçerli bir email adresi girin')
        .normalizeEmail()
        .isLength({ max: 100 }).withMessage('Email çok uzun'),
    
    body('password')
        .notEmpty().withMessage('Şifre gerekli')
        .isLength({ min: 6, max: 50 }).withMessage('Şifre 6-50 karakter arası olmalı')
        .matches(/\d/).withMessage('Şifre en az bir rakam içermeli'),
    
    body('role')
        .optional()
        .isIn(['User', 'Moderator', 'Admin']).withMessage('Geçersiz rol')
];

// Login Validation
export const loginValidation = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email gerekli')
        .isEmail().withMessage('Geçerli bir email adresi girin')
        .normalizeEmail(),
    
    body('password')
        .notEmpty().withMessage('Şifre gerekli')
];

// Refresh Token Validation
export const refreshTokenValidation = [
    body('refreshToken')
        .notEmpty().withMessage('Refresh token gerekli')
        .isString().withMessage('Token string olmalı')
];

// Profile Update Validation (İleride kullanmak için)
export const updateProfileValidation = [
    body('name')
        .optional()
        .trim()
        .isLength({ min: 3, max: 50 }).withMessage('İsim 3-50 karakter arası olmalı')
        .matches(/^[a-zA-ZğüşöçıİĞÜŞÖÇ\s]+$/).withMessage('İsim sadece harf içerebilir'),
    
    body('email')
        .optional()
        .trim()
        .isEmail().withMessage('Geçerli bir email adresi girin')
        .normalizeEmail()
];

// Change Password Validation (İleride kullanmak için)
export const changePasswordValidation = [
    body('currentPassword')
        .notEmpty().withMessage('Mevcut şifre gerekli'),
    
    body('newPassword')
        .notEmpty().withMessage('Yeni şifre gerekli')
        .isLength({ min: 6, max: 50 }).withMessage('Yeni şifre 6-50 karakter arası olmalı')
        .matches(/\d/).withMessage('Yeni şifre en az bir rakam içermeli')
        .custom((value, { req }) => {
            if (value === req.body.currentPassword) {
                throw new Error('Yeni şifre eski şifre ile aynı olamaz');
            }
            return true;
        }),
    
    body('confirmPassword')
        .notEmpty().withMessage('Şifre onayı gerekli')
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) {
                throw new Error('Şifreler eşleşmiyor');
            }
            return true;
        })
];
