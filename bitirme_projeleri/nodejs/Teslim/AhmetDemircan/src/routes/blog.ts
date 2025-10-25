import { Router } from 'express';
import { newBlogForm, listBlogsPage, showBlogPage, createBlog, editBlogForm, updateBlog, deleteBlog, togglePublish } from '../controllers/blogController';
import { authenticateWeb } from '../controllers/authController';
import { likeBlog, dislikeBlog } from '../controllers/restControllers/apiBlogController';

import {
  validateObjectIdParam,
  blogCreateRules,
  blogUpdateRules,
  blogTogglePublishRules,
  reactionParamRules,
  handleValidation
} from '../middleware/ValidationChainsExpress';

const router = Router();

router.get('/', authenticateWeb, listBlogsPage);
router.get('/new', authenticateWeb, newBlogForm);
router.get('/:id/edit', authenticateWeb, validateObjectIdParam, handleValidation, editBlogForm);
router.get('/:id', authenticateWeb, validateObjectIdParam, handleValidation, showBlogPage);

router.post('/', authenticateWeb, blogCreateRules, handleValidation, createBlog);
router.patch('/:id', authenticateWeb, validateObjectIdParam, blogUpdateRules, handleValidation, updateBlog);
router.delete('/:id', authenticateWeb, validateObjectIdParam, handleValidation, deleteBlog);
// Yeni: yayın durumu ucu
router.patch('/:id/publish', authenticateWeb, blogTogglePublishRules, handleValidation, togglePublish);

// Blog reactions (web)
router.post('/:id/like', authenticateWeb, reactionParamRules, handleValidation, likeBlog);
router.post('/:id/dislike', authenticateWeb, reactionParamRules, handleValidation, dislikeBlog);

// Form fallback’ları (PATCH/DELETE desteklemeyen durumlar için)
router.post('/:id', authenticateWeb, validateObjectIdParam, blogUpdateRules, handleValidation, updateBlog);
router.post('/:id/delete', authenticateWeb, validateObjectIdParam, handleValidation, deleteBlog);

export default router;