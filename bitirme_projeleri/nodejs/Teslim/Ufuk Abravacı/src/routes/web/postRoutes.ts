import { Router } from 'express';
import {
  postsPage,
  createPostPage,
  postDetailPage,
  createPost,
  deletePost,
  editPostPage, // ✅ Yeni metod
  updatePostHandler // ✅ Yeni metod
} from '../../controllers/web/postController';
import { authenticateSession } from '../../middlewares/authMiddleware';

const router = Router();

// GET Routes
router.get('/', postsPage);
router.get('/new', authenticateSession, createPostPage);
router.get('/:id', postDetailPage);
router.get('/:id/edit', authenticateSession, editPostPage); // ✅ Edit sayfası

// POST Routes
router.post('/', authenticateSession, createPost);
router.post('/:id/update', authenticateSession, updatePostHandler); // ✅ Update işlemi
router.post('/:id/delete', authenticateSession, deletePost);

export default router;