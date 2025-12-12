import express from 'express';
import { ArticleService } from '../services/articleService';
import { authenticateToken, authorizeRoles, optionalAuth } from '../middleware/auth';
import { validateArticle, validateArticleUpdate, validateObjectId, validatePagination, validateSearch } from '../middleware/validation';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Get all articles
 *     tags: [Articles]
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
 *         description: Number of articles per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in title and content
 *     responses:
 *       200:
 *         description: List of articles
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
 *                     articles:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Article'
 *                     total:
 *                       type: integer
 *                     pages:
 *                       type: integer
 */
router.get('/', validatePagination, asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const sort = req.query.sort as string || '-createdAt';
  
  const filters = {
    category: req.query.category as string,
    author: req.query.author as string,
    tags: req.query.tags ? (req.query.tags as string).split(',') : undefined,
    featured: req.query.featured === 'true' ? true : undefined,
    isPublished: req.query.published === 'true' ? true : undefined,
    search: req.query.search as string
  };

  const result = await ArticleService.getArticles(filters, { page, limit, sort });

  res.status(200).json({
    status: 'success',
    data: result
  });
}));

/**
 * @swagger
 * /api/articles/featured:
 *   get:
 *     summary: Get featured articles
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 6
 *         description: Number of featured articles
 *     responses:
 *       200:
 *         description: List of featured articles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Article'
 */
router.get('/featured', asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit as string) || 6;
  
  const filters = {
    featured: true,
    isPublished: true
  };

  const result = await ArticleService.getArticles(filters, { page: 1, limit, sort: '-publishedAt' });

  res.status(200).json({
    status: 'success',
    data: result.articles
  });
}));

// @desc    Get single article
// @route   GET /api/articles/:id
// @access  Public
router.get('/:id', validateObjectId('id'), optionalAuth, asyncHandler(async (req, res) => {
  const article = await ArticleService.getArticleById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: { article }
  });
}));

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Create a new article
 *     tags: [Articles]
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
 *                 example: Yeni Teknoloji Haberi
 *               excerpt:
 *                 type: string
 *                 example: Kısa haber özeti
 *               content:
 *                 type: string
 *                 example: Haber içeriği burada yer alır
 *               category:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["teknoloji", "yapay zeka"]
 *               coverImage:
 *                 type: string
 *                 example: https://example.com/image.jpg
 *               featured:
 *                 type: boolean
 *                 example: false
 *               isPublished:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Article created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Article created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     article:
 *                       $ref: '#/components/schemas/Article'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Author/Admin access required
 *       400:
 *         description: Bad request
 */
router.post('/', authenticateToken, authorizeRoles('author', 'admin'), validateArticle, asyncHandler(async (req, res) => {
  const articleData = {
    ...req.body,
    author: req.user!._id.toString()
  };

  const article = await ArticleService.createArticle(articleData);

  res.status(201).json({
    status: 'success',
    message: 'Article created successfully',
    data: { article }
  });
}));

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Update an article
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               excerpt:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               coverImage:
 *                 type: string
 *               featured:
 *                 type: boolean
 *               isPublished:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Article updated successfully
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
 *                     article:
 *                       $ref: '#/components/schemas/Article'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Author/Admin access required
 *       404:
 *         description: Article not found
 */
router.put('/:id', authenticateToken, validateObjectId('id'), validateArticleUpdate, asyncHandler(async (req, res) => {
  const article = await ArticleService.updateArticle(
    req.params.id,
    req.body,
    req.user!._id.toString()
  );

  res.status(200).json({
    status: 'success',
    message: 'Article updated successfully',
    data: { article }
  });
}));

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Delete an article
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article ID
 *     responses:
 *       200:
 *         description: Article deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Article deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Author/Admin access required
 *       404:
 *         description: Article not found
 */
router.delete('/:id', authenticateToken, validateObjectId('id'), asyncHandler(async (req, res) => {
  await ArticleService.deleteArticle(req.params.id, req.user!._id.toString());

  res.status(200).json({
    status: 'success',
    message: 'Article deleted successfully'
  });
}));

// @desc    Like article
// @route   POST /api/articles/:id/like
// @access  Private
router.post('/:id/like', authenticateToken, validateObjectId('id'), asyncHandler(async (req, res) => {
  const article = await ArticleService.likeArticle(req.params.id, req.user!._id.toString());

  res.status(200).json({
    status: 'success',
    message: 'Article liked successfully',
    data: { article }
  });
}));

// @desc    Dislike article
// @route   POST /api/articles/:id/dislike
// @access  Private
router.post('/:id/dislike', authenticateToken, validateObjectId('id'), asyncHandler(async (req, res) => {
  const article = await ArticleService.dislikeArticle(req.params.id, req.user!._id.toString());

  res.status(200).json({
    status: 'success',
    message: 'Article disliked successfully',
    data: { article }
  });
}));

// @desc    Get featured articles
// @route   GET /api/articles/featured
// @access  Public
router.get('/featured', asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit as string) || 5;
  const articles = await ArticleService.getFeaturedArticles(limit);

  res.status(200).json({
    status: 'success',
    data: { articles }
  });
}));

// @desc    Get popular articles
// @route   GET /api/articles/popular
// @access  Public
router.get('/popular', asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit as string) || 5;
  const articles = await ArticleService.getPopularArticles(limit);

  res.status(200).json({
    status: 'success',
    data: { articles }
  });
}));

export default router;
