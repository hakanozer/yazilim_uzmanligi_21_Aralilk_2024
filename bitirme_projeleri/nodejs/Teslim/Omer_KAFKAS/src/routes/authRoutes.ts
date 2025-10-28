import express from 'express';
import { register, login, getProfile, refreshAccessToken } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { registerValidation, loginValidation, refreshTokenValidation } from '../validations/authValidator';
import { validate } from '../validations';

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Yeni kullanıcı kaydı
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ahmet Yılmaz
 *               email:
 *                 type: string
 *                 format: email
 *                 example: ahmet@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 example: ahmet123
 *               role:
 *                 type: string
 *                 enum: [User, Moderator, Admin]
 *                 default: User
 *     responses:
 *       201:
 *         description: Kayıt başarılı
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Validation hatası veya email zaten kullanılıyor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/register', registerValidation, validate, register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Kullanıcı girişi
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: ahmet@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: ahmet123
 *     responses:
 *       200:
 *         description: Giriş başarılı, JWT token döner
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                     refreshToken:
 *                       type: string
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       401:
 *         description: Geçersiz email veya şifre
 */
router.post('/login', loginValidation, validate, login);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Access token yenileme
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token başarıyla yenilendi
 *       401:
 *         description: Geçersiz refresh token
 */
router.post('/refresh', refreshTokenValidation, validate, refreshAccessToken);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Kullanıcı profil bilgilerini getir
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profil bilgileri başarıyla getirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       401:
 *         description: Yetkisiz erişim - Token geçersiz veya eksik
 *       404:
 *         description: Kullanıcı bulunamadı
 */
router.get('/profile', authMiddleware, (req, res) => {
    console.log('🔴 API ROUTE: /api/auth/profile route çağrıldı!');
    return getProfile(req, res);
});

export default router;

