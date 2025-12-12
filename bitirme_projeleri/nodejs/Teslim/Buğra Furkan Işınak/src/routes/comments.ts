import express from 'express';
import { Comment } from '../models/Comment';
import { Article } from '../models/Article';
import { authenticateToken } from '../middleware/auth';
import { validateComment, validateObjectId } from '../middleware/validation';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

/**
 * @swagger
 * /api/comments/article/{articleId}:
 *   get:
 *     summary: Get comments for an article
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *         description: Article ID
 *     responses:
 *       200:
 *         description: List of comments
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
 *                     comments:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Invalid article ID
 */
router.get('/article/:articleId', validateObjectId('articleId'), asyncHandler(async (req, res) => {
  const comments = await Comment.find({ 
    article: req.params.articleId,
    isApproved: true,
    parentComment: null 
  })
    .populate('author', 'firstName lastName profilePicture')
    .populate('replies')
    .sort('-createdAt');

  res.status(200).json({
    status: 'success',
    data: { comments }
  });
}));

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - article
 *             properties:
 *               content:
 *                 type: string
 *                 example: Çok güzel bir haber!
 *               article:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               parentComment:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *     responses:
 *       201:
 *         description: Comment created successfully
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
 *                   example: Comment created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     comment:
 *                       $ref: '#/components/schemas/Comment'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Article not found
 *       400:
 *         description: Bad request
 */
router.post('/', authenticateToken, validateComment, asyncHandler(async (req, res) => {
  // Verify article exists
  const article = await Article.findById(req.body.article);
  if (!article) {
    return res.status(404).json({
      status: 'error',
      message: 'Article not found'
    });
  }

  const commentData = {
    ...req.body,
    author: req.user!._id
  };

  const comment = new Comment(commentData);
  await comment.save();

  // Add comment to article
  article.comments.push(comment._id);
  await article.save();

  // If it's a reply, add to parent comment
  if (req.body.parentComment) {
    const parentComment = await Comment.findById(req.body.parentComment);
    if (parentComment) {
      parentComment.replies.push(comment._id);
      await parentComment.save();
    }
  }

  const populatedComment = await Comment.findById(comment._id)
    .populate('author', 'firstName lastName profilePicture');

  res.status(201).json({
    status: 'success',
    message: 'Comment created successfully',
    data: { comment: populatedComment }
  });
}));

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
router.put('/:id', authenticateToken, validateObjectId('id'), asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return res.status(404).json({
      status: 'error',
      message: 'Comment not found'
    });
  }

  // Check if user is the author
  if (comment.author.toString() !== req.user!._id.toString()) {
    return res.status(403).json({
      status: 'error',
      message: 'Not authorized to update this comment'
    });
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.id,
    { content: req.body.content },
    { new: true, runValidators: true }
  ).populate('author', 'firstName lastName profilePicture');

  res.status(200).json({
    status: 'success',
    message: 'Comment updated successfully',
    data: { comment: updatedComment }
  });
}));

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
router.delete('/:id', authenticateToken, validateObjectId('id'), asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return res.status(404).json({
      status: 'error',
      message: 'Comment not found'
    });
  }

  // Check if user is the author or admin
  const isAuthor = comment.author.toString() === req.user!._id.toString();
  const isAdmin = req.user!.roles.includes('admin');

  if (!isAuthor && !isAdmin) {
    return res.status(403).json({
      status: 'error',
      message: 'Not authorized to delete this comment'
    });
  }

  await Comment.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: 'success',
    message: 'Comment deleted successfully'
  });
}));

// @desc    Like comment
// @route   POST /api/comments/:id/like
// @access  Private
router.post('/:id/like', authenticateToken, validateObjectId('id'), asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return res.status(404).json({
      status: 'error',
      message: 'Comment not found'
    });
  }

  const userId = req.user!._id;

  // Remove from dislikes if present
  comment.dislikes = comment.dislikes.filter(id => !id.equals(userId));

  // Add to likes if not already present
  if (!comment.likes.some(id => id.equals(userId))) {
    comment.likes.push(userId);
  } else {
    // Remove from likes if already present
    comment.likes = comment.likes.filter(id => !id.equals(userId));
  }

  await comment.save();

  res.status(200).json({
    status: 'success',
    message: 'Comment liked successfully',
    data: { comment }
  });
}));

// @desc    Dislike comment
// @route   POST /api/comments/:id/dislike
// @access  Private
router.post('/:id/dislike', authenticateToken, validateObjectId('id'), asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return res.status(404).json({
      status: 'error',
      message: 'Comment not found'
    });
  }

  const userId = req.user!._id;

  // Remove from likes if present
  comment.likes = comment.likes.filter(id => !id.equals(userId));

  // Add to dislikes if not already present
  if (!comment.dislikes.some(id => id.equals(userId))) {
    comment.dislikes.push(userId);
  } else {
    // Remove from dislikes if already present
    comment.dislikes = comment.dislikes.filter(id => !id.equals(userId));
  }

  await comment.save();

  res.status(200).json({
    status: 'success',
    message: 'Comment disliked successfully',
    data: { comment }
  });
}));

// @desc    Get user's comments
// @route   GET /api/comments/user/:userId
// @access  Private
router.get('/user/:userId', authenticateToken, validateObjectId('userId'), asyncHandler(async (req, res) => {
  const comments = await Comment.find({ author: req.params.userId })
    .populate('article', 'title slug')
    .populate('author', 'firstName lastName profilePicture')
    .sort('-createdAt');

  res.status(200).json({
    status: 'success',
    data: { comments }
  });
}));

export default router;
