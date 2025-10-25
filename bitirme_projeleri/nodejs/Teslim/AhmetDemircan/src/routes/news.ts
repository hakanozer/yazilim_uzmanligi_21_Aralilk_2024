import { Router } from 'express';
import { authenticateWeb, authorizeRoles } from '../controllers/authController';
import { listNewsPage, newNewsForm, showNewsPage, createNews, editNewsForm } from '../controllers/newsController';
import { likeNews, dislikeNews } from '../controllers/restControllers/apiNewsController';
import {
  validateObjectIdParam,
  newsCreateRules,
  reactionParamRules,
  handleValidation
} from '../middleware/ValidationChainsExpress';

const router = Router();

router.get('/', authenticateWeb, listNewsPage);
router.get('/new', authenticateWeb, newNewsForm);
router.get('/:id/edit', authenticateWeb, validateObjectIdParam, handleValidation, editNewsForm);
router.get('/:id', authenticateWeb, validateObjectIdParam, handleValidation, showNewsPage);
router.post('/', authenticateWeb, authorizeRoles('admin', 'author'), newsCreateRules, handleValidation, createNews);
router.post('/:id/like', authenticateWeb, reactionParamRules, handleValidation, likeNews);
router.post('/:id/dislike', authenticateWeb, reactionParamRules, handleValidation, dislikeNews);

export default router;