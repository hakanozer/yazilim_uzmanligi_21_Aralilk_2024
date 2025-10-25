import express from 'express';
import jwt from 'jsonwebtoken';
import UserDB from '../models/userModel';
import { decrypt } from '../Config/cryptoJS';
import { authJWT } from '../middlewares/authJWT';

export const authController = express.Router();

// Helper: standard error response
const internalError = (res: express.Response, err: unknown) => {
  console.error('Auth API error:', err);
  return res.status(500).json({ error: 'Internal Server Error' });
};

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Yeni kullanıcı kaydı oluşturur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - surname
 *               - lastname
 *               - email
 *               - password
 *             properties:
 *               surname:
 *                 type: string
 *                 example: "Ahmet"
 *               lastname:
 *                 type: string
 *                 example: "Yılmaz"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "ahmet@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Kullanıcı başarıyla oluşturuldu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Kullanıcı başarıyla oluşturuldu"
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     surname:
 *                       type: string
 *                     lastname:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: Eksik parametreler veya geçersiz veri
 *       409:
 *         description: Email zaten kullanımda
 *       500:
 *         description: Sunucu hatası
 */
authController.post('/register', async (req, res) => {
  try {
    const { surname, lastname, email, password } = req.body || {};
    
    if (!surname || !lastname || !email || !password) {
      return res.status(400).json({ error: 'Tüm alanlar gereklidir' });
    }

    // Check if user already exists
    const existingUser = await UserDB.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Bu email adresi zaten kullanımda' });
    }

    // Create new user (you'll need to implement user creation logic)
    // This is a placeholder - you should use your existing user creation service
    const newUser = new UserDB({
      surname,
      lastname,
      email,
      password, // This should be encrypted
      role: 'user'
    });
    
    await newUser.save();
    
    return res.status(201).json({
      message: 'Kullanıcı başarıyla oluşturuldu',
      user: {
        _id: newUser._id,
        surname: newUser.surname,
        lastname: newUser.lastname,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err) {
    return internalError(res, err);
  }
});

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Kullanıcı girişi yapar ve JWT üretir
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
 *                 example: "caglarkizilaslan@outlook.com"
 *               password:
 *                 type: string
 *                 example: "A123456"
 *     responses:
 *       200:
 *         description: Başarılı giriş
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     surname:
 *                       type: string
 *                     lastname:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: Eksik parametreler
 *       401:
 *         description: Hatalı email veya şifre
 *       500:
 *         description: Sunucu hatası
 */
authController.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'email and password are required' });
    
    const user = await UserDB.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Email or password wrong' });
    
    const plain = decrypt(user.password);
    if (plain !== password) return res.status(401).json({ error: 'Email or password wrong' });
    
    const secret = process.env.JWT_SECRET || 'jwt_secret_123';
    const token = jwt.sign({ _id: String(user._id), role: user.role }, secret, { expiresIn: '2h' });
    
    return res.json({ 
      token,
      user: {
        _id: user._id,
        surname: user.surname,
        lastname: user.lastname,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    return internalError(res, err);
  }
});


authController.get('/profile', authJWT, async (req, res) => {
  try {
    const u = (req as any).jwtUser as { _id: string };
    const user = await UserDB.findById(u._id).select('_id surname lastname email role date');
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json(user);
  } catch (err) {
    return internalError(res, err);
  }
});


authController.post('/refresh', authJWT, async (req, res) => {
  try {
    const u = (req as any).jwtUser as { _id: string; role: string };
    const secret = process.env.JWT_SECRET || 'jwt_secret_123';
    const token = jwt.sign({ _id: u._id, role: u.role }, secret, { expiresIn: '2h' });
    return res.json({ token });
  } catch (err) {
    return internalError(res, err);
  }
});

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Kullanıcının oturumunu sonlandırır
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Başarıyla çıkış yapıldı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Başarıyla çıkış yapıldı"
 *       401:
 *         description: Yetkisiz erişim
 *       500:
 *         description: Sunucu hatası
 */
authController.post('/logout', authJWT, async (req, res) => {
  try {
    // In a stateless JWT system, logout is typically handled client-side
    // by removing the token. This endpoint can be used for logging purposes
    return res.json({ message: 'Başarıyla çıkış yapıldı' });
  } catch (err) {
    return internalError(res, err);
  }
});
