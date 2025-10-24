import { Router } from 'express';
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost
} from '../../controllers/api/postController';
import { authenticateJWT } from '../../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Blog post yönetimi
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Tüm postları listele
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Post listesi getirildi
 */
router.get('/', getPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: ID'ye göre post getir
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post detayları
 *       404:
 *         description: Post bulunamadı
 */
router.get('/:id', getPost);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Yeni post oluştur
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Yeni Blog Yazısı"
 *               content:
 *                 type: string
 *                 example: "Bu bir blog yazısı içeriğidir."
 *               category:
 *                 type: string
 *                 example: "technology"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["nodejs", "typescript"]
 *     responses:
 *       201:
 *         description: Post başarıyla oluşturuldu
 */
router.post('/', authenticateJWT, createPost);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Post güncelle
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Post başarıyla güncellendi
 */
router.put('/:id', authenticateJWT, updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Post sil
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post başarıyla silindi
 */
router.delete('/:id', authenticateJWT, deletePost);

export default router;