import express from 'express';
import { ArticleService } from '../services/articleService';
import { Category } from '../models/Category';
import { User } from '../models/User';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

// @desc    Home page
// @route   GET /
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
    res.render('index', {
        title: 'Habercilik.com - Türkiye\'nin Haber Platformu',
        description: 'Türkiye\'nin en güncel haber platformu. Teknoloji, spor, ekonomi, sağlık ve daha fazlası için tek adres.',
        protocol: req.protocol,
        host: req.get('host'),
        originalUrl: req.originalUrl
    });
}));

// @desc    Articles page
// @route   GET /articles
// @access  Public
router.get('/articles', asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const category = req.query.category as string;
    const search = req.query.search as string;
    
    const filters = {
        category,
        search,
        isPublished: true
    };
    
    const result = await ArticleService.getArticles(filters, { page, limit });
    const categories = await Category.find({ isActive: true }).sort('name');
    
    res.render('articles/index', {
        title: 'Haberler - Habercilik.com',
        description: 'Türkiye\'nin en güncel haberleri',
        articles: result.articles,
        categories,
        pagination: {
            page: result.page,
            pages: result.pages,
            total: result.total,
            hasNext: result.page < result.pages,
            hasPrev: result.page > 1
        },
        currentCategory: category,
        searchQuery: search
    });
}));

// @desc    New article page
// @route   GET /articles/new
// @access  Private (Author/Admin)
router.get('/articles/new', asyncHandler(async (req, res) => {
    res.render('articles/new', {
        title: 'Yeni Haber - Habercilik.com',
        description: 'Yeni haber oluşturun'
    });
}));

// @desc    Single article page
// @route   GET /articles/:id
// @access  Public
router.get('/articles/:id', asyncHandler(async (req, res) => {
    // Check if it's 'new' route
    if (req.params.id === 'new') {
        return res.render('articles/new', {
            title: 'Yeni Haber - Habercilik.com',
            description: 'Yeni haber oluşturun'
        });
    }
    
    const article = await ArticleService.getArticleById(req.params.id);
    
    if (!article.isPublished) {
        return res.status(404).render('errors/404', {
            title: 'Haber Bulunamadı',
            message: 'Aradığınız haber bulunamadı veya yayından kaldırılmış.'
        });
    }
    
    // Get related articles
    const relatedArticles = await ArticleService.getArticles(
        { category: article.category._id.toString(), isPublished: true },
        { page: 1, limit: 4 }
    );
    
    res.render('articles/show', {
        title: `${article.title} - Habercilik.com`,
        description: article.excerpt,
        article,
        relatedArticles: relatedArticles.articles.filter(a => a._id.toString() !== article._id.toString()).slice(0, 3),
        protocol: req.protocol,
        host: req.get('host'),
        originalUrl: req.originalUrl
    });
}));

// @desc    Category page
// @route   GET /categories/:slug
// @access  Public
router.get('/categories/:slug', asyncHandler(async (req, res) => {
    const category = await Category.findOne({ slug: req.params.slug, isActive: true });
    
    if (!category) {
        return res.status(404).render('errors/404', {
            title: 'Kategori Bulunamadı',
            message: 'Aradığınız kategori bulunamadı.'
        });
    }
    
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    
    const result = await ArticleService.getArticles(
        { category: category._id.toString(), isPublished: true },
        { page, limit }
    );
    
    res.render('categories/show', {
        title: `${category.name} Haberleri - Habercilik.com`,
        description: category.description || `${category.name} kategorisindeki en güncel haberler`,
        category,
        articles: result.articles,
        pagination: {
            page: result.page,
            pages: result.pages,
            total: result.total,
            hasNext: result.page < result.pages,
            hasPrev: result.page > 1
        }
    });
}));

// @desc    Search page
// @route   GET /search
// @access  Public
router.get('/search', asyncHandler(async (req, res) => {
    const query = req.query.q as string;
    
    if (!query || query.length < 2) {
        return res.render('search/index', {
            title: 'Arama - Habercilik.com',
            description: 'Haberlerde arama yapın',
            query: '',
            articles: [],
            pagination: null
        });
    }
    
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    
    const result = await ArticleService.getArticles(
        { search: query, isPublished: true },
        { page, limit }
    );
    
    res.render('search/index', {
        title: `"${query}" Arama Sonuçları - Habercilik.com`,
        description: `"${query}" için arama sonuçları`,
        query,
        articles: result.articles,
        pagination: {
            page: result.page,
            pages: result.pages,
            total: result.total,
            hasNext: result.page < result.pages,
            hasPrev: result.page > 1
        }
    });
}));

// @desc    About page
// @route   GET /about
// @access  Public
router.get('/about', asyncHandler(async (req, res) => {
    res.render('pages/about', {
        title: 'Hakkımızda - Habercilik.com',
        description: 'Habercilik.com hakkında bilgi alın'
    });
}));

// @desc    Contact page
// @route   GET /contact
// @access  Public
router.get('/contact', asyncHandler(async (req, res) => {
    res.render('pages/contact', {
        title: 'İletişim - Habercilik.com',
        description: 'Bizimle iletişime geçin'
    });
}));

// @desc    Privacy page
// @route   GET /privacy
// @access  Public
router.get('/privacy', asyncHandler(async (req, res) => {
    res.render('pages/privacy', {
        title: 'Gizlilik Politikası - Habercilik.com',
        description: 'Gizlilik politikamız'
    });
}));

// @desc    Terms page
// @route   GET /terms
// @access  Public
router.get('/terms', asyncHandler(async (req, res) => {
    res.render('pages/terms', {
        title: 'Kullanım Şartları - Habercilik.com',
        description: 'Kullanım şartlarımız'
    });
}));

// @desc    Login page
// @route   GET /auth/login
// @access  Public
router.get('/auth/login', asyncHandler(async (req, res) => {
    res.render('auth/login', {
        title: 'Giriş Yap - Habercilik.com',
        description: 'Habercilik.com hesabınıza giriş yapın'
    });
}));

// @desc    Register page
// @route   GET /auth/register
// @access  Public
router.get('/auth/register', asyncHandler(async (req, res) => {
    res.render('auth/register', {
        title: 'Kayıt Ol - Habercilik.com',
        description: 'Habercilik.com\'a üye olun'
    });
}));

// @desc    Logout
// @route   GET /auth/logout
// @access  Public
router.get('/auth/logout', asyncHandler(async (req, res) => {
    // Frontend'de localStorage temizlenecek
    res.redirect('/');
}));

// @desc    404 Not Found page
// @route   GET /404
// @access  Public
router.get('/404', asyncHandler(async (req, res) => {
    res.status(404).render('errors/404', {
        title: 'Sayfa Bulunamadı - Habercilik.com',
        description: 'Aradığınız sayfa mevcut değil'
    });
}));

// @desc    Redirect /login to /auth/login
// @route   GET /login
// @access  Public
router.get('/login', asyncHandler(async (req, res) => {
    res.redirect('/auth/login');
}));

// @desc    Redirect /register to /auth/register
// @route   GET /register
// @access  Public
router.get('/register', asyncHandler(async (req, res) => {
    res.redirect('/auth/register');
}));

// @desc    User profile page
// @route   GET /profile
// @access  Private
router.get('/profile', asyncHandler(async (req, res) => {
    res.render('profile', {
        title: 'Profil - Habercilik.com',
        description: 'Kullanıcı profili'
    });
}));

// @desc    Admin panel
// @route   GET /admin
// @access  Private (Admin only)
router.get('/admin', asyncHandler(async (req, res) => {
    res.render('admin/dashboard', {
        title: 'Admin Panel - Habercilik.com',
        description: 'Yönetim paneli'
    });
}));

// @desc    Category management
// @route   GET /admin/categories
// @access  Private (Admin only)
router.get('/admin/categories', asyncHandler(async (req, res) => {
    res.render('admin/categories', {
        title: 'Kategori Yönetimi - Habercilik.com',
        description: 'Kategori yönetim paneli'
    });
}));

// @desc    Users management
// @route   GET /users
// @access  Public
router.get('/users', asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
        User.find()
            .select('-password')
            .sort('-createdAt')
            .skip(skip)
            .limit(limit),
        User.countDocuments()
    ]);

    const pages = Math.ceil(total / limit);

    res.render('users/index', {
        title: 'Kullanıcılar - Habercilik.com',
        description: 'Tüm kullanıcıları görüntüleyin',
        users,
        pagination: {
            page,
            limit,
            total,
            pages
        }
    });
}));

export default router;
