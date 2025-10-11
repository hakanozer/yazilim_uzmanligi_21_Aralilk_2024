import express from 'express';
import { checkRole, verifyToken, AuthRequest } from '../configs/auth';
import { eRoles } from '../utils/eRoles';
import { 
    createComment, 
    updateComment, 
    approveComment, 
    getComments, 
    getUserComments, 
    getPendingComments,
    searchComments 
} from '../services/commentService';
import { JwtPayload } from 'jsonwebtoken';

const commentRestController = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the comment
 *           example: "665f1c2b9e6e4a001f8e4b1b"
 *         content:
 *           type: string
 *           description: Comment content
 *           minLength: 1
 *           maxLength: 500
 *           example: "Çok güzel bir ürün!"
 *         userId:
 *           type: string
 *           description: ID of the user who wrote the comment
 *           example: "665f1c2b9e6e4a001f8e4b1a"
 *         userEmail:
 *           type: string
 *           description: Email of the user
 *           example: "user@example.com"
 *         isApproved:
 *           type: boolean
 *           description: Approval status
 *           example: false
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
 * /comments/create:
 *   post:
 *     summary: Create a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Çok güzel bir ürün!"
 *     responses:
 *       201:
 *         description: Comment created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *     x-roles:
 *       - User
 */

/**
 * @swagger
 * /comments/update/{id}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Güncellenmiş yorum içeriği"
 *     responses:
 *       200:
 *         description: Comment updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *     x-roles:
 *       - User
 *       - Customer
 */

/**
 * @swagger
 * /comments/approve/{id}:
 *   patch:
 *     summary: Approve or reject a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isApproved:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Comment approval updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin role required)
 *     x-roles:
 *       - Admin
 */

/**
 * @swagger
 * /comments/list:
 *   get:
 *     summary: List all comments (paginated)
 *     tags: [Comments]
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
 *         description: List of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *                 page:
 *                   type: integer
 *                   example: 1
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /comments/my-comments:
 *   get:
 *     summary: List comments of the authenticated user
 *     tags: [Comments]
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
 *         description: List of user's comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *                 page:
 *                   type: integer
 *                   example: 1
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /comments/pending:
 *   get:
 *     summary: List pending comments (Admin only)
 *     tags: [Comments]
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
 *         description: List of pending comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *                 page:
 *                   type: integer
 *                   example: 1
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin role required)
 *     x-roles:
 *       - Admin
 */

/**
 * @swagger
 * /comments/search:
 *   get:
 *     summary: Search comments by content
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Search term
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
 *         description: List of matching comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *                 page:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Search term required
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /comments/user/{userId}:
 *   get:
 *     summary: List comments of a specific user (Admin or Customer)
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
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
 *         description: List of user's comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *                 page:
 *                   type: integer
 *                   example: 1
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin or Customer role required)
 *     x-roles:
 *       - Admin
 *       - Customer
 */


commentRestController.post('/create', verifyToken, checkRole(eRoles.User), async (req: AuthRequest, res) => {
    const user = req.user as JwtPayload;
    const commentData = req.body;
    
    const result = await createComment(commentData, user.id, user.email);
    res.status(result.code).json(result);
});

// Yorum güncelleme - JWT gerekli, User veya Customer rolü
commentRestController.put('/update/:id', verifyToken, async (req: AuthRequest, res) => {
    const user = req.user as JwtPayload;
    const commentId = req.params.id;
    const updateData = req.body;
    
    const result = await updateComment(commentId, updateData, user.id, user.roles);
    res.status(result.code).json(result);
});

// Yorum onaylama - JWT gerekli, Admin rolü
commentRestController.patch('/approve/:id', verifyToken, checkRole(eRoles.Admin), async (req: AuthRequest, res) => {
    const user = req.user as JwtPayload;
    const commentId = req.params.id;
    const { isApproved } = req.body;
    
    const result = await approveComment(commentId, isApproved);
    res.status(result.code).json(result);
});

// Tüm yorumları listeleme - JWT gerekli
commentRestController.get('/list', verifyToken, async (req: AuthRequest, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await getComments(page, limit);
    res.status(result.code).json(result);
});

// Kullanıcıya özel yorumlar - JWT gerekli
commentRestController.get('/my-comments', verifyToken, async (req: AuthRequest, res) => {
    const user = req.user as JwtPayload;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await getUserComments(user.id, page, limit);
    res.status(result.code).json(result);
});

// Onay bekleyen yorumlar - JWT gerekli, Admin rolü
commentRestController.get('/pending', verifyToken, checkRole(eRoles.Admin), async (req: AuthRequest, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await getPendingComments(page, limit);
    res.status(result.code).json(result);
});

// Yorum arama - JWT gerekli
commentRestController.get('/search', verifyToken, async (req: AuthRequest, res) => {
    const searchTerm = req.query.q as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    if (!searchTerm) {
        return res.status(400).json({
            code: 400,
            status: false,
            message: 'Arama terimi gerekli',
            data: null
        });
    }
    
    const result = await searchComments(searchTerm, page, limit);
    res.status(result.code).json(result);
});

// Belirli bir kullanıcının yorumları - JWT gerekli, Admin veya Customer rolü
commentRestController.get('/user/:userId', verifyToken, checkRole(eRoles.Admin, eRoles.Customer), async (req: AuthRequest, res) => {
    const userId = req.params.userId;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await getUserComments(userId, page, limit);
    res.status(result.code).json(result);
});

export default commentRestController;