import { Router } from 'express';
import { isAuthenticated, isAdmin } from '../../middlewares/authMiddleware'; 
import { showAdminDashboard, handleDeleteUser, handleDeletePostAdmin } from '../../controllers/web/adminController';

const router = Router();

// ======================================
// ADMİN ROTALARI (GİRİŞ ve ADMİN ROLÜ GEREKLİ)
// ======================================
router.use(isAuthenticated);
router.use(isAdmin); 

// Admin Dashboard Sayfası
router.get('/dashboard', showAdminDashboard);
router.post('/users/:id/delete', handleDeleteUser);
router.post('/posts/:id/delete', handleDeletePostAdmin); 

export default router;