import express from 'express';
import { 
    getAdminDashboard, 
    getAllUsers, 
    deleteUser, 
    updateUserRole,
    getAllNewsAdmin,
    deleteNewsAdmin
} from '../controllers/adminController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { requireRole } from '../middlewares/roleMiddleware';
import { eRoles } from '../utils/eRoles';

const router = express.Router();

// Tüm admin route'ları sadece Admin rolü için
router.use(authMiddleware, requireRole(eRoles.Admin));

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Admin dashboard istatistikleri
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard verileri başarıyla getirildi
 *       401:
 *         description: Yetkisiz erişim
 *       403:
 *         description: Admin yetkisi gerekli
 */
router.get('/dashboard', getAdminDashboard);

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Tüm kullanıcıları listele
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: İsim veya email'e göre arama
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [User, Moderator, Admin]
 *     responses:
 *       200:
 *         description: Kullanıcılar başarıyla getirildi
 */
router.get('/users', getAllUsers);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Kullanıcı sil
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Kullanıcı başarıyla silindi
 *       400:
 *         description: Kendi hesabını silemezsiniz
 *       403:
 *         description: Başka bir admin'i silemezsiniz
 *       404:
 *         description: Kullanıcı bulunamadı
 */
router.delete('/users/:id', deleteUser);

/**
 * @swagger
 * /api/admin/users/{id}/role:
 *   put:
 *     summary: Kullanıcı rolünü güncelle
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [User, Moderator, Admin]
 *     responses:
 *       200:
 *         description: Rol başarıyla güncellendi
 *       400:
 *         description: Geçersiz rol veya kendi rolünüzü değiştiremezsiniz
 */
router.put('/users/:id/role', updateUserRole);

/**
 * @swagger
 * /api/admin/news:
 *   get:
 *     summary: Tüm haberleri listele (Admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Haberler başarıyla getirildi
 */
router.get('/news', getAllNewsAdmin);

/**
 * @swagger
 * /api/admin/news/{id}:
 *   delete:
 *     summary: Haber sil (Admin - Herhangi bir haberi silebilir)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Haber başarıyla silindi
 *       404:
 *         description: Haber bulunamadı
 */
router.delete('/news/:id', deleteNewsAdmin);

export default router;
