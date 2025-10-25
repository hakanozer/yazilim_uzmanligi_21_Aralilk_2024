import { Router } from 'express';
// API controller'ını doğru yoldan import et
import userRestController from '../../controllers/api/userRestController'; // Doğru import

const router = Router();
// API projesindeki app.use('/api/v1/users', userRestController) satırını temel alıyoruz.
router.use('/users', userRestController);
export default router;