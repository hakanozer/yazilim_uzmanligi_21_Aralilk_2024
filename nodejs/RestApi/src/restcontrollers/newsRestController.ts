import express from 'express'
import { AuthRequest, checkRole, verifyToken } from '../configs/auth';
import { eRoles } from '../utils/eRoles';
import { addNews, newsListAll, removeNews, searchNews, updateNews } from '../services/newsService';
import { JwtPayload } from 'jsonwebtoken';

const newsRestController = express.Router()

/**
 * @swagger
 * tags:
 *   name: News
 *   description: News management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     News:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the news
 *           example: "665f1c2b9e6e4a001f8e4b1b"
 *         title:
 *           type: string
 *           description: News title
 *           minLength: 2
 *           maxLength: 100
 *           example: "New Product Launch"
 *         content:
 *           type: string
 *           description: News content
 *           example: "We are excited to announce our new product..."
 *         author:
 *           type: string
 *           description: Author user id
 *           example: "665f1c2b9e6e4a001f8e4b1c"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-06-21T12:34:56.789Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-06-21T12:34:56.789Z"
 */

/**
 * @swagger
 * /news/add:
 *   post:
 *     summary: Add news
 *     tags: [News]
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
 *                 example: "New Product Launch"
 *               content:
 *                 type: string
 *                 example: "We are excited to announce our new product..."
 *     responses:
 *       201:
 *         description: News created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin or Customer role required)
 *       500:
 *         description: Internal server error
 *     x-roles:
 *       - Admin
 *       - Customer
 */

/**
 * @swagger
 * /news/update/{id}:
 *   put:
 *     summary: Update news
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: News ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated News Title"
 *               content:
 *                 type: string
 *                 example: "Updated content..."
 *     responses:
 *       200:
 *         description: News updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin role required)
 *       404:
 *         description: News not found
 *       500:
 *         description: Internal server error
 *     x-roles:
 *       - Admin
 */

/**
 * @swagger
 * /news/delete/{id}:
 *   delete:
 *     summary: Delete news
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: News ID
 *     responses:
 *       200:
 *         description: News deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin role required)
 *       404:
 *         description: News not found
 *       500:
 *         description: Internal server error
 *     x-roles:
 *       - Admin
 */

/**
 * @swagger
 * /news/list:
 *   get:
 *     summary: List news (paginated, 10 per page)
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of news
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 news:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/News'
 *                 page:
 *                   type: integer
 *                   example: 1
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin role required)
 *       500:
 *         description: Internal server error
 *     x-roles:
 *       - Admin
 */

/**
 * @swagger
 * /news/search:
 *   get:
 *     summary: Search news by query string
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 news:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/News'
 *                 page:
 *                   type: integer
 *                   example: 1
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin or User role required)
 *       500:
 *         description: Internal server error
 *     x-roles:
 *       - Admin
 *       - User
 */

newsRestController.post("/add", verifyToken, checkRole(eRoles.Admin, eRoles.Customer), async (req: AuthRequest, res) => {
  try {
    const data = req.body;
    const user = req.user as JwtPayload;
    const result = await addNews(data, user.id);
    return res.status(result.code).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});


newsRestController.put("/update/:id", verifyToken, checkRole(eRoles.Admin), async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await updateNews(id, data)
    return res.status(result.code).json(result)
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error })
  }
})

newsRestController.delete("/delete/:id", verifyToken, checkRole(eRoles.Admin), async (req, res) => {
  try {
    const { id } = req.params;
    const result = await removeNews(id);
    return res.status(result.code).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

// Haber Listeleme
newsRestController.get("/list", verifyToken, checkRole(eRoles.Admin), async (req, res) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const result = await newsListAll(page, limit);
        return res.status(result.code).json(result);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
});

newsRestController.get("/search", verifyToken, checkRole(eRoles.Admin, eRoles.User), async (req, res) => {
  try {
    const q = (req.query.q as string) || "";
    const page = parseInt(req.query.page as string) || 1;
    const result = await searchNews(q, page, 10);
    return res.status(result.code).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});


export default newsRestController