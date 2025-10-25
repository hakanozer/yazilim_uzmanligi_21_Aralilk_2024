import { Router } from 'express';
import { registerForm, register } from '../controllers/registerController';
import { loginForm, login } from '../controllers/loginController';
import {
  logout,
  profilePage,
  updateProfileInfo,
  changePassword,
  uploadProfilePicture,
  myBlogs,
  myNews,
  deleteMe
} from '../controllers/profileController';
import { authenticateWeb } from '../controllers/authController';
import multer from 'multer';
import path from 'path';
import {
  authRegisterRules,
  authLoginRules,
  profileUpdateInfoRules,
  profileChangePasswordRules,
  handleValidation
} from '../middleware/ValidationChainsExpress';
const router = Router();

router.get('/register', registerForm);
router.post('/register', authRegisterRules, handleValidation, register);

router.get('/login', loginForm);
router.post('/login', authLoginRules, handleValidation, login);

// Profil EJS sayfası ve formları
router.get('/profile', authenticateWeb, profilePage);
router.post('/profile/info', authenticateWeb, profileUpdateInfoRules, handleValidation, updateProfileInfo);
router.post('/profile/password', authenticateWeb, profileChangePasswordRules, handleValidation, changePassword);
router.post('/profile/picture', authenticateWeb, multer({ dest: path.join(__dirname, '../../public/uploads/avatars') }).single('avatar'), uploadProfilePicture);
router.get('/profile/blogs', authenticateWeb, myBlogs);
router.get('/profile/news', authenticateWeb, myNews);
router.delete('/profile', authenticateWeb, deleteMe);
router.get('/logout', logout);
export default router;