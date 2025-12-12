import express from 'express';
import { Category } from '../models/Category';
import { authenticateToken, authorizeRoles } from '../middleware/auth';
import { validateCategory, validateObjectId } from '../middleware/validation';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all active categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     categories:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Category'
 */
router.get('/', asyncHandler(async (req, res) => {
  const categories = await Category.find({ isActive: true }).sort('name');

  res.status(200).json({
    status: 'success',
    data: { categories }
  });
}));

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
router.get('/:id', validateObjectId('id'), asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      status: 'error',
      message: 'Category not found'
    });
  }

  res.status(200).json({
    status: 'success',
    data: { category }
  });
}));

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category (Admin only)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - color
 *             properties:
 *               name:
 *                 type: string
 *                 example: Teknoloji
 *               description:
 *                 type: string
 *                 example: Teknoloji haberleri
 *               color:
 *                 type: string
 *                 example: '#007bff'
 *               icon:
 *                 type: string
 *                 example: 'fas fa-laptop'
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     category:
 *                       $ref: '#/components/schemas/Category'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.post('/', authenticateToken, authorizeRoles('admin'), validateCategory, asyncHandler(async (req, res) => {
  const category = new Category(req.body);
  await category.save();

  res.status(201).json({
    status: 'success',
    message: 'Category created successfully',
    data: { category }
  });
}));

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private (Admin only)
router.put('/:id', authenticateToken, authorizeRoles('admin'), validateObjectId('id'), validateCategory, asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!category) {
    return res.status(404).json({
      status: 'error',
      message: 'Category not found'
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'Category updated successfully',
    data: { category }
  });
}));

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private (Admin only)
router.delete('/:id', authenticateToken, authorizeRoles('admin'), validateObjectId('id'), asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );

  if (!category) {
    return res.status(404).json({
      status: 'error',
      message: 'Category not found'
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'Category deactivated successfully'
  });
}));

export default router;
