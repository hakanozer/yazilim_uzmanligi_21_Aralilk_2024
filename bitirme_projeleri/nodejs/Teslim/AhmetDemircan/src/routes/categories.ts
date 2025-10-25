import { Router } from 'express';
import { authenticateWeb } from '../controllers/authController';
import { listCategoriesPage, newCategoryForm, createCategoryWeb } from '../controllers/categoryController';
import { categoryCreateRules, handleValidation } from '../middleware/ValidationChainsExpress';

const router = Router();

router.get('/', authenticateWeb, listCategoriesPage);
router.get('/new', authenticateWeb, newCategoryForm);
router.post('/', authenticateWeb, categoryCreateRules, handleValidation, createCategoryWeb);

export default router;