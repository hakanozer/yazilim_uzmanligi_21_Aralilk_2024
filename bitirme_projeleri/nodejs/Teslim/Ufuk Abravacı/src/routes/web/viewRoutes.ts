import { Router } from 'express';
import { authenticateSession } from '../../middlewares/authMiddleware';
import { dashboardPage } from '../../controllers/web/postController';

const router = Router();

// Basit ana sayfa
router.get('/', (req, res) => {
     console.log('Session user:', req.session.user); // Debug için
    res.render('index', {
        title: 'Ana Sayfa',
        user: req.session.user || null
    });
});

// Dashboard
router.get('/dashboard', authenticateSession, dashboardPage);

// Admin paneli
router.get('/admin', authenticateSession, (req, res) => {
    if (req.session.user?.role !== 'admin') {
        return res.redirect('/');
    }
    
    res.render('admin/index', {
        title: 'Admin Panel',
        user: req.session.user
    });
});

export default router;