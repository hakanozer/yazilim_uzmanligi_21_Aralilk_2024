import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

// Ana Sayfa
router.get('/', (req, res) => {
    res.render('pages/home', { 
        title: 'Ana Sayfa - NewsHub',
        page: 'home'
    });
});

// Giriş Sayfası
router.get('/login', (req, res) => {
    res.render('pages/login', { 
        title: 'Giriş Yap - NewsHub',
        page: 'login',
        layout: false
    });
});

// Kayıt Sayfası
router.get('/register', (req, res) => {
    res.render('pages/register', { 
        title: 'Kayıt Ol - NewsHub',
        page: 'register',
        layout: false
    });
});

// Haber Oluşturma Sayfası (Admin ve Moderator) - ÖNEMLİ: /news/:id'den ÖNCE olmalı!
router.get('/news/create', (req, res) => {
    res.render('pages/create-news', { 
        title: 'Yeni Haber Oluştur - NewsHub',
        page: 'create-news'
    });
});

// Kullanıcının Haberleri - ÖNEMLİ: /news/:id'den ÖNCE olmalı!
router.get('/my-news', (req, res) => {
    res.render('pages/my-news', { 
        title: 'Haberlerim - NewsHub',
        page: 'my-news'
    });
});

// Haber Detay Sayfası - ÖNEMLİ: Parametreli route'lar en sona!
router.get('/news/:id', (req, res) => {
    res.render('pages/news-detail', { 
        title: 'Haber Detay - NewsHub',
        page: 'news-detail',
        newsId: req.params.id
    });
});

// Profil Sayfası
router.get('/profile', (req, res) => {
    console.log('🔵 VIEW ROUTE: /profile route çağrıldı!');
    console.log('🔵 Headers:', req.headers);
    res.render('pages/profile', { 
        title: 'Profil - NewsHub',
        page: 'profile'
    });
});

// Admin Paneli
router.get('/admin', (req, res) => {
    res.render('pages/admin', { 
        title: 'Admin Panel - NewsHub',
        page: 'admin'
    });
});

// Hata Sayfaları
router.use((req, res) => {
    res.status(404).render('errors/404', { 
        title: '404 - Sayfa Bulunamadı',
        page: '404'
    });
});

export default router;
