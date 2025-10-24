import { Router } from 'express';
import { 
  loginPage, 
  loginUser, 
  registerPage, 
  registerUser, 
  logoutUser 
} from '../../controllers/web/authController';
import { validate } from '../../middlewares/validationMiddleware';
import { registerValidation, loginValidation } from '../../validations/authValidation';

const router = Router();

// Sayfalar
router.get('/login', loginPage);
router.get('/register', registerPage);

// Form işlemleri
router.post('/login', validate(loginValidation), loginUser);
router.post('/register', validate(registerValidation), registerUser);
router.post('/logout', logoutUser);

export default router;