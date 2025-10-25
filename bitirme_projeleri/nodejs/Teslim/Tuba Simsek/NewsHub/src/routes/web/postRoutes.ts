import { Router } from 'express';
import { isAuthenticated, isAuthor, canDeleteComment } from '../../middlewares/authMiddleware';
import upload from '../../utils/fileUpload';
import {
    showHomePage,
    showNewPostForm,
    handleCreatePost,
    showDashboard,
    showPostDetail, 
    showEditPostForm, 
    handleUpdatePost, 
    handleDeletePost,  
} from '../../controllers/web/postController';
import { handleCreateComment, handleDeleteComment} from '../../controllers/web/commentController';
import { createPostValidationRules, updatePostValidationRules } from '../../validations/post.validator';
import { commentValidationRules } from '../../validations/comment.validator';


const router = Router();

// ======================================
// HERKESE AÇIK ROTALAR
// ======================================

// ANASAYFA ROTASI
router.get('/', showHomePage);

// ======================================
// GİRİŞ YAPMIŞ KULLANICI ROTALARI
// ======================================
// DASHBOARD (KULLANICI PANELİ) ROTASI
router.get('/dashboard', isAuthenticated, showDashboard);

// YENİ YAZI OLUŞTURMA FORMU
router.get('/posts/new', isAuthenticated, showNewPostForm);

// YENİ YAZI OLUŞTURMA
router.post(
    '/posts',
    isAuthenticated,
    upload.single('postImage'), // Önce resmi yükle (varsa)
    handleCreatePost   ,         // Sonra veriyi işle
    createPostValidationRules()
);

// YAZI DETAY SAYFASI ROTASI
router.get('/posts/:id', showPostDetail);

// Yazı Düzenleme Formunu GÖSTERME
// Sadece giriş yapmış ve yazının sahibi olan kullanıcı erişebilir
router.get('/posts/:id/edit', isAuthenticated, isAuthor, showEditPostForm);

// Yazı Düzenleme Formunu İŞLEME
// Sadece giriş yapmış ve yazının sahibi olan kullanıcı erişebilir
// Resim yükleme olabileceği için multer middleware'ini de ekledim
router.post(
    '/posts/:id/update', 
    isAuthenticated, 
    isAuthor, 
    upload.single('postImage'), // Önce resim (varsa) yüklenir
    updatePostValidationRules(),
    handleUpdatePost            // Sonra güncelleme işlenir
);

// Yazı SİLME İşlemi
// Sadece giriş yapmış ve yazının sahibi olan kullanıcı erişebilir
router.post('/posts/:id/delete', isAuthenticated, isAuthor, handleDeletePost);


// ======================================
// YORUM İŞLEMLERİ
// ======================================

// YENİ YORUM EKLEME (İŞLEME)
// Sadece giriş yapmış kullanıcılar yorum yapabilir
// Rota: /posts/POST_ID/comment şeklinde olacak
router.post('/posts/:id/comment', isAuthenticated, handleCreateComment, commentValidationRules());

// YORUM SİLME (İŞLEME)
// Sadece admin veya post sahibi erişebilir
// URL'in hem post hem de comment ID'sini içermesi önemli
router.post(
    '/posts/:postId/comment/:commentId/delete', 
    isAuthenticated,       // 1. Giriş yapmış mı?
    canDeleteComment,      // 2. Yorumu silebilir mi (Admin veya Post Sahibi)?
    handleDeleteComment    // 3. Silme işlemini yap
);

export default router;