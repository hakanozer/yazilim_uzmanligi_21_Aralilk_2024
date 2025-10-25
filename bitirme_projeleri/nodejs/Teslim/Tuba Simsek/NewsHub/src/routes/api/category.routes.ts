import { Router } from 'express';
import categoryRestController from '../../controllers/api/categoryRestController';

const router = Router();

// API projesindeki app.use('/api/v1/categories', ...) 
router.use('/categories', categoryRestController);

export default router;