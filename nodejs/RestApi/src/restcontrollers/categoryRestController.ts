import express from 'express'
import { AuthRequest, checkRole, verifyToken } from '../configs/auth';
import { eRoles } from '../utils/eRoles';
import Category, { ICategory } from '../models/category'; // Model'i import et
import { JwtPayload } from 'jsonwebtoken';

const categoryRestController = express.Router()

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the category
 *           example: "665f1c2b9e6e4a001f8e4b1a"
 *         name:
 *           type: string
 *           description: Category name
 *           minLength: 2
 *           maxLength: 50
 *           example: "Elektronik"
 *         description:
 *           type: string
 *           description: Category description
 *           example: "Elektronik ürünler kategorisi"
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
 * /categories/add:
 *   post:
 *     summary: Add a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *           example:
 *             name: "Kitaplar"
 *             description: "Kitap kategorisi"
 *     responses:
 *       201:
 *         description: Category added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category added successfully
 *                 category:
 *                   $ref: '#/components/schemas/Category'
 *       400:
 *         description: Invalid category name
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
 * /categories/list:
 *   get:
 *     summary: List categories (paginated, 10 per page)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
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

// Kategori ekleme
categoryRestController.post('/add', verifyToken, checkRole(eRoles.Admin), async (req: AuthRequest, res) => {
  try {
    const categorydata = req.body as ICategory;
    const user = req.user as JwtPayload;
    
    if (!categorydata.name || categorydata.name.length < 2 || categorydata.name.length > 50) {
      return res.status(400).json({ message: 'Invalid category name' });
    }
    const newCategory = new Category(categorydata);
    await newCategory.save();

    return res.status(201).json({ 
      message: 'Category added successfully', 
      category: newCategory 
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
});

// Kategori listeleme (10'ar 10'ar)
categoryRestController.get('/list', verifyToken, checkRole(eRoles.Admin), async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const categories = await Category.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return res.status(200).json({ 
      categories,
      page
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
});

// Router'ı export et
export default categoryRestController;
