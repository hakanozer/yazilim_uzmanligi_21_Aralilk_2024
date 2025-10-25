import express from 'express'
import { AuthRequest, checkRole, verifyToken } from '../../middlewares/jwtAuth';
import { eRoles } from '../../utils/eRoles';
import { addpost, postListAll, removepost, searchpost, updatepost } from '../../services/api/postService';
import { JwtPayload } from 'jsonwebtoken';

const postRestController = express.Router()

/**
 * @swagger
 * tags:
 *   name: post
 *   description: post management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the post
 *           example: "665f1c2b9e6e4a001f8e4b1b"
 *         title:
 *           type: string
 *           description: post title
 *           minLength: 2
 *           maxLength: 100
 *           example: "New Product Launch"
 *         content:
 *           type: string
 *           description: post content
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
 * /post/add:
 *   post:
 *     summary: Add post
 *     tags: [post]
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
 *         description: post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/post'
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
 * /post/update/{id}:
 *   put:
 *     summary: Update post
 *     tags: [post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated post Title"
 *               content:
 *                 type: string
 *                 example: "Updated content..."
 *     responses:
 *       200:
 *         description: post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/post'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin role required)
 *       404:
 *         description: post not found
 *       500:
 *         description: Internal server error
 *     x-roles:
 *       - Admin
 */

/**
 * @swagger
 * /post/delete/{id}:
 *   delete:
 *     summary: Delete post
 *     tags: [post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: post ID
 *     responses:
 *       200:
 *         description: post deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin role required)
 *       404:
 *         description: post not found
 *       500:
 *         description: Internal server error
 *     x-roles:
 *       - Admin
 */

/**
 * @swagger
 * /post/list:
 *   get:
 *     summary: List post (paginated, 10 per page)
 *     tags: [post]
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
 *         description: List of post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/post'
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
 * /post/search:
 *   get:
 *     summary: Search post by query string
 *     tags: [post]
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
 *                 post:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/post'
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

postRestController.post("/add", verifyToken, checkRole(eRoles.Admin, eRoles.Customer), async (req: AuthRequest, res) => {
  try {
    const data = req.body;
    const user = req.user as JwtPayload;
    const result = await addpost(data, user.id);
    return res.status(result.code).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});


postRestController.put("/update/:id", verifyToken, checkRole(eRoles.Admin), async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await updatepost(id, data)
    return res.status(result.code).json(result)
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error })
  }
})

postRestController.delete("/delete/:id", verifyToken, checkRole(eRoles.Admin), async (req, res) => {
  try {
    const { id } = req.params;
    const result = await removepost(id);
    return res.status(result.code).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

// Haber Listeleme
postRestController.get("/list", verifyToken, checkRole(eRoles.Admin), async (req, res) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const result = await postListAll(page, limit);
        return res.status(result.code).json(result);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
});

postRestController.get("/search", verifyToken, checkRole(eRoles.Admin, eRoles.User), async (req, res) => {
  try {
    const q = (req.query.q as string) || "";
    const page = parseInt(req.query.page as string) || 1;
    const result = await searchpost(q, page, 10);
    return res.status(result.code).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});


export default postRestController