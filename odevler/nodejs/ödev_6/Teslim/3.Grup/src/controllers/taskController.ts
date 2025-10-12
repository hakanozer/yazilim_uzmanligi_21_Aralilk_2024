import express, { Request, Response } from 'express';
import taskServices, { deleteTask } from '../services/taskServices';
import { verifyToken, requireAdmin, AuthRequest } from '../middlewares/authMiddleware';

const taskController = express.Router();

// Swagger Docs için açıklamalar
/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Görev yönetim işlemleri
 */

/**
 * @swagger
 * /tasks/list:
 *   get:
 *     summary: Tüm görevleri listele (Admin only)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Görev durumu ile filtreleme
 *       - in: query
 *         name: assignedTo
 *         schema:
 *           type: string
 *         description: Göreve atanan kullanıcı ile filtreleme
 *     responses:
 *       200:
 *         description: Başarılı işlem
 *       401:
 *         description: Yetkilendirme hatası
 *       403:
 *         description: Erişim reddedildi
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /tasks/add:
 *   post:
 *     summary: Yeni görev oluştur (Admin only)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - title
 *               - description
 *     responses:
 *       201:
 *         description: Görev başarıyla oluşturuldu
 *       400:
 *         description: Geçersiz istek verisi
 *       401:
 *         description: Yetkilendirme hatası
 *       403:
 *         description: Erişim reddedildi
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Belirli bir görevi getir
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Görev ID'si
 *     responses:
 *       200:
 *         description: Görev başarıyla getirildi
 *       401:
 *         description: Yetkilendirme hatası
 *       403:
 *         description: Erişim reddedildi
 *       404:
 *         description: Görev bulunamadı
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Görevi güncelle (Admin only)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Görev ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Görev başarıyla güncellendi
 *       400:
 *         description: Geçersiz istek verisi
 *       401:
 *         description: Yetkilendirme hatası
 *       403:
 *         description: Erişim reddedildi
 *       404:
 *         description: Görev bulunamadı
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /tasks/delete/{id}:
 *   delete:
 *     summary: Görevi sil (Admin only)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Görev ID'si
 *     responses:
 *       200:
 *         description: Görev başarıyla silindi
 *       401:
 *         description: Yetkilendirme hatası
 *       403:
 *         description: Erişim reddedildi
 *       404:
 *         description: Görev bulunamadı
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /tasks/status/{id}:
 *   put:
 *     summary: Görev durumu güncelle (Admin only)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Görev ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *             required:
 *               - status
 *     responses:
 *       200:
 *         description: Görev durumu başarıyla güncellendi
 *       400:
 *         description: Geçersiz istek verisi
 *       401:
 *         description  : Yetkilendirme hatası
 *       403:
 *         description: Erişim reddedildi
 *       404:
 *         description: Görev bulunamadı
 *       500:
 *         description: Sunucu hatası
 */

// Debug middleware
taskController.use((req, res, next) => {
    console.log(`Task Route: ${req.method} ${req.path}`);
    next();
});

// Tüm görevleri listeleme (Admin only)
taskController.get('/list', verifyToken, requireAdmin, async (req: Request, res: Response) => {
    try {
        const filters = req.query;
        const result = await taskServices.getAllTasks(filters);
        return res.status(result.code).json(result);
    } catch (error) {
        return res.status(500).json({
            code: 500,
            status: false,
            message: 'Sunucu hatası',
            error: error
        });
    }
});

// Yeni görev oluşturma (Admin only)
taskController.post('/add', verifyToken, requireAdmin, async (req: Request, res: Response) => {
    try {
        const result = await taskServices.addTask(req.body);
        return res.status(result.code).json(result);
    } catch (error) {
        return res.status(500).json({
            code: 500,
            status: false,
            message: 'Sunucu hatası',
            error: error
        });
    }
});

// Belirli bir görevi getirme
taskController.get('/:id', verifyToken, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await taskServices.getTaskById(id);
        // Type guard: if result has a numeric 'code' we treat it as IResult, otherwise it's the task object
        if (result && typeof (result as any).code === 'number') {
            return res.status((result as any).code).json(result);
        }
        // If service returned the raw task object, respond with a standardized success wrapper
        return res.status(200).json({
            code: 200,
            status: true,
            message: 'Görev bulundu',
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            status: false,
            message: 'Sunucu hatası',
            error: error
        });
    }
});

// Görevi güncelleme (Admin only)
taskController.put('/:id', verifyToken, requireAdmin, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await taskServices.updateTask(id, req.body);
        return res.status(result.code).json(result);
    } catch (error) {
        return res.status(500).json({
            code: 500,
            status: false,
            message: 'Sunucu hatası',
            error: error
        });
    }
});

// Görevi silme (Admin only)
taskController.delete('/delete/:id', verifyToken, requireAdmin, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await deleteTask(id);
        // If service returned an IResult-like object with a numeric code, use it directly
        if (result && typeof (result as any).code === 'number') {
            return res.status((result as any).code).json(result);
        }
        // Otherwise assume the service returned the deleted task object and wrap it
        return res.status(200).json({
            code: 200,
            status: true,
            message: 'Görev silindi',
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            status: false,
            message: 'Sunucu hatası',
            error: error
        });
    }
});

// Görev durumu güncelleme (Admin only)
taskController.put('/status/:id', verifyToken, requireAdmin, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const result = await taskServices.updateTaskStatus(id, status);
        return res.status(result.code).json(result);
    } catch (error) {
        return res.status(500).json({
            code: 500,
            status: false,
            message: 'Sunucu hatası',
            error: error
        });
    }
});


export default taskController;