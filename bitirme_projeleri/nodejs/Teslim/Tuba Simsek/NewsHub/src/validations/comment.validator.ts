import { body } from 'express-validator';

export const commentValidationRules = () => {
  return [
    // 'text' alanı (yorum metni) için kurallar
    body('text')
      .trim() // Başındaki/sonundaki boşlukları sil
      .notEmpty().withMessage('Yorum alanı boş bırakılamaz.')
      .isLength({ min: 3, max: 1000 }).withMessage('Yorum 3 ile 1000 karakter arasında olmalıdır.')
      .escape() // Zararlı olabilecek karakterleri engelliyor
  ];
};