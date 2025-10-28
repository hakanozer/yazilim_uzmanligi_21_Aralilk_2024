import express from "express";
import {getAllNews,getNewsById,getNewsByCategory,createNews,updateNews,deleteNews,changeNewsStatus,getMyNews} from "../controllers/newsController";
import { authMiddleware } from "../middlewares/authMiddleware";
import {authWithRole,requireAdmin,requireModeratorOrAdmin} from "../middlewares/roleMiddleware";
import { validate, createNewsValidation, updateNewsValidation, changeStatusValidation } from "../validations";
import { uploadSingle } from "../middlewares/uploadMiddleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: News
 *   description: Haber yönetimi API endpoint'leri
 */

// ============================================
// PUBLIC ROUTES (JWT Yok)
// ============================================

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Tüm haberleri listele
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Sayfa numarası
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Sayfa başına haber sayısı
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Kategori filtresi
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Arama terimi
 *     responses:
 *       200:
 *         description: Haber listesi
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
 *                     news:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/News'
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: number
 *                         page:
 *                           type: number
 *                         pages:
 *                           type: number
 *                         limit:
 *                           type: number
 */
router.get("/", getAllNews); // Tüm haberler (pagination, filter)

/**
 * @swagger
 * /api/news/category/{category}:
 *   get:
 *     summary: Kategoriye göre haberler
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Teknoloji, Spor, Ekonomi, Sağlık, Eğitim, Gündem, Diğer]
 *         description: Haber kategorisi
 *     responses:
 *       200:
 *         description: Kategori haberleri
 */
router.get("/category/:category", getNewsByCategory); // Kategoriye göre

// ============================================
// PROTECTED ROUTES (JWT + Role)
// ============================================

/**
 * @swagger
 * /api/news/my/news:
 *   get:
 *     summary: Kendi haberlerimi getir
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Kullanıcının haberleri
 *       401:
 *         description: Yetkisiz erişim
 */
// Kendi haberlerini görme (ÖNCE - Yoksa "my" bir ID olarak algılanır!)
router.get(
  "/my/news",
  authMiddleware, // Sadece token kontrolü
  getMyNews
);

/**
 * @swagger
 * /api/news/{id}:
 *   get:
 *     summary: ID'ye göre haber detayı
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Haber ID
 *     responses:
 *       200:
 *         description: Haber detayı
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       404:
 *         description: Haber bulunamadı
 */
// Tek haber detayı (SONRA - Wildcard route)
router.get("/:id", getNewsById);

/**
 * @swagger
 * /api/news:
 *   post:
 *     summary: Yeni haber oluştur (Admin/Moderator)
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 200
 *               content:
 *                 type: string
 *                 minLength: 20
 *               category:
 *                 type: string
 *                 enum: [Teknoloji, Spor, Ekonomi, Sağlık, Eğitim, Gündem, Diğer]
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Haber oluşturuldu
 *       401:
 *         description: Yetkisiz erişim
 *       403:
 *         description: Yetki yok (sadece Admin/Moderator)
 */
// Haber oluşturma - Admin veya Moderator
router.post(
  "/",
  authWithRole, // Token + Role
  requireModeratorOrAdmin, // Admin veya Moderator
  uploadSingle, // Dosya upload (ÖNCE)
  createNewsValidation,
  validate,
  createNews
);

/**
 * @swagger
 * /api/news/{id}:
 *   put:
 *     summary: Haber güncelle (Sahibi veya Admin/Moderator)
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Haber güncellendi
 *       403:
 *         description: Bu haberi güncelleme yetkiniz yok
 *       404:
 *         description: Haber bulunamadı
 */
// Haber güncelleme - Kendi haberi
router.put(
  "/:id",
  authMiddleware, // Token kontrolü
  uploadSingle, // Dosya upload (opsiyonel)
  updateNewsValidation,
  validate,
  updateNews
);

/**
 * @swagger
 * /api/news/{id}/status:
 *   patch:
 *     summary: Haber durumu değiştir (Admin/Moderator)
 *     tags: [News]
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
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [draft, published]
 *     responses:
 *       200:
 *         description: Durum güncellendi
 *       403:
 *         description: Yetki yok
 */
// Haber durumu değiştirme - Admin/Moderator
router.patch(
  "/:id/status",
  authWithRole, // Token + Role
  requireModeratorOrAdmin, // Admin veya Moderator
  changeStatusValidation,
  validate,
  changeNewsStatus
);

/**
 * @swagger
 * /api/news/{id}:
 *   delete:
 *     summary: Haber sil (Sahibi veya Admin)
 *     tags: [News]
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
 *         description: Haber silindi
 *       403:
 *         description: Bu haberi silme yetkiniz yok
 *       404:
 *         description: Haber bulunamadı
 */
// Haber silme - Admin veya kendi haberi
router.delete(
  "/:id",
  authMiddleware, // Token kontrolü
  deleteNews // Controller'da owner/admin kontrolü
);

export default router;
