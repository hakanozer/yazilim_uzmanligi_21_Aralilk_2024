import express from 'express';
import { 
    createComment, 
    getCommentsByNews, 
    deleteComment, 
    updateComment,
    getMyComments 
} from '../controllers/commentController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { 
    createCommentValidation, 
    updateCommentValidation, 
    commentIdValidation,
    newsIdValidation 
} from '../validations/commentValidator';
import { validate } from '../validations';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Yorum yönetimi API endpoint'leri
 */

/**
 * @swagger
 * /api/comments/my-comments:
 *   get:
 *     summary: Kendi yorumlarımı getir
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Kullanıcının yorumları
 *       401:
 *         description: Yetkisiz erişim
 */
// Yorumlarım (Protected)
router.get('/my-comments', authMiddleware, getMyComments);

/**
 * @swagger
 * /api/comments/news/{newsId}:
 *   get:
 *     summary: Bir haberin tüm yorumlarını getir
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: newsId
 *         required: true
 *         schema:
 *           type: string
 *         description: Haber ID
 *     responses:
 *       200:
 *         description: Yorum listesi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     comments:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Haber bulunamadı
 */
// Habere ait yorumları getir (Public)
router.get('/news/:newsId', newsIdValidation, validate, getCommentsByNews);

/**
 * @swagger
 * /api/comments/news/{newsId}:
 *   post:
 *     summary: Habere yorum yap
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: newsId
 *         required: true
 *         schema:
 *           type: string
 *         description: Haber ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 1000
 *                 description: Yorum içeriği
 *     responses:
 *       201:
 *         description: Yorum oluşturuldu
 *       400:
 *         description: Validasyon hatası
 *       401:
 *         description: Yetkisiz erişim
 *       404:
 *         description: Haber bulunamadı
 */
// Yorum oluştur (Protected)
router.post('/news/:newsId', authMiddleware, createCommentValidation, validate, createComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     summary: Yorumu güncelle (Sadece yorum sahibi)
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Yorum ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 1000
 *     responses:
 *       200:
 *         description: Yorum güncellendi
 *       403:
 *         description: Bu yorumu güncelleme yetkiniz yok
 *       404:
 *         description: Yorum bulunamadı
 */
// Yorum güncelle (Protected - Sadece yorum sahibi)
router.put('/:id', authMiddleware, updateCommentValidation, validate, updateComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Yorumu sil (Yorum sahibi veya Admin)
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Yorum ID
 *     responses:
 *       200:
 *         description: Yorum silindi
 *       403:
 *         description: Bu yorumu silme yetkiniz yok
 *       404:
 *         description: Yorum bulunamadı
 */
// Yorum sil (Protected - Admin veya yorum sahibi)
router.delete('/:id', authMiddleware, commentIdValidation, validate, deleteComment);

export default router;
