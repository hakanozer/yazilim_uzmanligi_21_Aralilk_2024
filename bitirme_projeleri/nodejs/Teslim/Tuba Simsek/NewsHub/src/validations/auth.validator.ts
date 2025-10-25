import { body } from 'express-validator';
import UserDB from '../models/userModel'; 
export const registerValidationRules = () => {
  return [
    // 1. 'name' alanı için kurallar
    body('name')
      .trim() // Başındaki/sonundaki boşlukları sil
      .notEmpty().withMessage('Ad Soyad alanı boş bırakılamaz.')
      .isLength({ min: 3 }).withMessage('Ad Soyad en az 3 karakter olmalıdır.'),

    // 2. 'email' alanı için kurallar
    body('email')
      .trim()
      .notEmpty().withMessage('Email alanı boş bırakılamaz.')
      .isEmail().withMessage('Lütfen geçerli bir email adresi girin.')
      // Özel kontrol: Bu email veritabanında zaten var mı?
      .custom(async (value) => {
        const user = await UserDB.findOne({ email: value });
        if (user) {
          // Eğer kullanıcı bulunduysa, bu email zaten kullanılıyor demektir.
          return Promise.reject('Bu email adresi zaten kullanılıyor.');
        }
      }),

    // 3. 'password' alanı için kurallar
    body('password')
      .notEmpty().withMessage('Parola alanı boş bırakılamaz.')
      .isLength({ min: 6 }).withMessage('Parola en az 6 karakter uzunluğunda olmalıdır.')
  ];
}

export const loginValidationRules = () => {
    return [
        body('email')
            .trim()
            .notEmpty().withMessage('Email alanı boş bırakılamaz.')
            .isEmail().withMessage('Lütfen geçerli bir email adresi girin.'),
        body('password')
            .notEmpty().withMessage('Parola alanı boş bırakılamaz.')
    ];
};

export const updateProfileValidationRules = () => {
  return [
    // 1. 'name' alanı için kurallar
    body('name')
      .trim()
      .notEmpty().withMessage('Ad Soyad alanı boş bırakılamaz.')
      .isLength({ min: 3 }).withMessage('Ad Soyad en az 3 karakter olmalıdır.'),

    // 2. 'email' alanı için kurallar
    body('email')
      .trim()
      .notEmpty().withMessage('Email alanı boş bırakılamaz.')
      .isEmail().withMessage('Lütfen geçerli bir email adresi girin.')
      // Özel kontrol: Girilen email BAŞKA BİR kullanıcı tarafından kullanılıyor mu?
      .custom(async (value, { req }) => {
        // Mevcut kullanıcının ID'sini request'ten al (session'dan)
        const userId = req.session.userId; 
        if (!userId) { 
            // Bu normalde isAuthenticated middleware'i tarafından engellenir
            throw new Error('Kimlik doğrulama hatası.'); 
        }
        // Email'i ve farklı bir ID'si olan kullanıcıyı ara
        const user = await UserDB.findOne({ email: value, _id: { $ne: userId } });
        if (user) {
          // Eğer başka bir kullanıcı bu email'i kullanıyorsa reddet
          return Promise.reject('Bu email adresi başka bir kullanıcı tarafından kullanılıyor.');
        }
      }),
  ];
};