import { Router, Request } from 'express';
import { authenticateJWT, authorizeRoles } from '../controllers/authController';
import { listBlogs, getBlog, createBlog, updateBlog, deleteBlog, likeBlog, dislikeBlog } from '../controllers/restControllers/apiBlogController';
import { register, login, profile, refresh, logout } from '../controllers/restControllers/apiAuthController';
import { searchBlogs, searchNews } from '../controllers/restControllers/apiSearchController';
import { listNews, getNews, createNews, updateNews, deleteNews, likeNews, dislikeNews } from '../controllers/restControllers/apiNewsController';
import { listCategories, getCategory, createCategory } from '../controllers/restControllers/apiCategoryController';
import multer from 'multer';
import path from 'path';
import {
  getMyProfile,
  updateMyInfo,
  changeMyPassword,
  uploadMyAvatar,
  deleteMe,
  adminDeleteUser,
  adminUpdateRoles
} from '../controllers/restControllers/apiProfileController';
import {
  validateObjectIdParam,
  blogCreateRules,
  blogUpdateRules,
  reactionParamRules,
  newsCreateRules,
  newsUpdateRules,
  categoryCreateRules,
  searchQueryRules,
  authLoginRules,
  authRegisterRules,
  profileUpdateInfoRules,
  profileChangePasswordRules,
  handleValidation,
  commentCreateRules,
  commentUpdateRules
} from '../middleware/ValidationChainsExpress';
import {
  listBlogComments,
  listNewsComments,
  createComment,
  updateComment,
  deleteComment,
  listComments
} from '../controllers/restControllers/apiCommentController';
import {
  adminListUsers,
  adminListBlogs,
  adminListNews,
  adminDeleteBlog,
  adminDeleteNews,
  adminTogglePublishBlog,
  adminToggleActiveNews,
  adminUpdateUserRoles
} from '../controllers/restControllers/apiAdminController';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024, files: 1 },
  fileFilter: (
    _req: Request,
    file: Express.Multer.File,
    cb: (error: any, acceptFile: boolean) => void
  ) => {
    const allowed = ['.png', '.jpg', '.jpeg', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext)) {
      cb(new Error('Sadece png/jpg/jpeg/webp dosyaları'), false);
      return;
    }
    cb(null, true);
  }
});

// v1 Blogs
router.get('/v1/blogs', listBlogs);
router.get('/v1/blogs/search', searchQueryRules, handleValidation, searchBlogs);
router.get('/v1/search/blogs', searchQueryRules, handleValidation, searchBlogs);
// Yeni: v1 News arama
router.get('/v1/search/news', searchQueryRules, handleValidation, searchNews);

router.get('/v1/blogs/:id', validateObjectIdParam, handleValidation, getBlog);
router.post('/v1/blogs', authenticateJWT, blogCreateRules, handleValidation, createBlog);
router.put('/v1/blogs/:id', authenticateJWT, validateObjectIdParam, blogUpdateRules, handleValidation, updateBlog);
router.delete('/v1/blogs/:id', authenticateJWT, validateObjectIdParam, handleValidation, deleteBlog);
router.post('/v1/blogs/:id/like', authenticateJWT, reactionParamRules, handleValidation, likeBlog);
router.post('/v1/blogs/:id/dislike', authenticateJWT, reactionParamRules, handleValidation, dislikeBlog);

// v1 News
router.get('/v1/news', listNews);
router.get('/v1/news/:id', validateObjectIdParam, handleValidation, getNews);
router.post('/v1/news', authenticateJWT, authorizeRoles('admin', 'author'), newsCreateRules, handleValidation, createNews);
router.put('/v1/news/:id', authenticateJWT, authorizeRoles('admin', 'author'), validateObjectIdParam, newsUpdateRules, handleValidation, updateNews);
router.delete('/v1/news/:id', authenticateJWT, authorizeRoles('admin', 'author'), validateObjectIdParam, handleValidation, deleteNews);
router.post('/v1/news/:id/like', authenticateJWT, reactionParamRules, handleValidation, likeNews);
router.post('/v1/news/:id/dislike', authenticateJWT, reactionParamRules, handleValidation, dislikeNews);

// v1 Comments
router.get('/v1/comments', authenticateJWT, listComments);
router.get('/v1/blogs/:id/comments', validateObjectIdParam, handleValidation, listBlogComments);
router.get('/v1/news/:id/comments', validateObjectIdParam, handleValidation, listNewsComments);
router.post('/v1/comments', authenticateJWT, commentCreateRules, handleValidation, createComment);
router.put('/v1/comments/:id', authenticateJWT, validateObjectIdParam, commentUpdateRules, handleValidation, updateComment);
router.delete('/v1/comments/:id', authenticateJWT, validateObjectIdParam, handleValidation, deleteComment);

// v1 Categories
router.get('/v1/categories', listCategories);
router.get('/v1/categories/:id', validateObjectIdParam, handleValidation, getCategory);
router.post('/v1/categories', authenticateJWT, authorizeRoles('admin'), categoryCreateRules, handleValidation, createCategory);

// v1 Auth
router.post('/v1/auth/register', authRegisterRules, handleValidation, register);
router.post('/v1/auth/login', authLoginRules, handleValidation, login);
router.get('/v1/auth/profile', authenticateJWT, profile);
router.post('/v1/auth/refresh', authenticateJWT, refresh);
router.post('/v1/auth/logout', authenticateJWT, logout);

// v1 Profile (JWT)
router.get('/v1/profile', authenticateJWT, getMyProfile);
router.put('/v1/profile', authenticateJWT, profileUpdateInfoRules, handleValidation, updateMyInfo);
router.post('/v1/profile/password', authenticateJWT, profileChangePasswordRules, handleValidation, changeMyPassword);
router.post('/v1/profile/picture', authenticateJWT, upload.single('avatar'), uploadMyAvatar);
router.delete('/v1/profile', authenticateJWT, deleteMe);

// v1 Admin (JWT + admin)
router.delete('/v1/admin/users/:id', authenticateJWT, authorizeRoles('admin'), validateObjectIdParam, handleValidation, adminDeleteUser);
router.put('/v1/admin/users/:id/roles', authenticateJWT, authorizeRoles('admin'), validateObjectIdParam, handleValidation, adminUpdateUserRoles);

// Yeni: admin listeleri
router.get('/v1/admin/users', authenticateJWT, authorizeRoles('admin'), adminListUsers);
router.get('/v1/admin/blogs', authenticateJWT, authorizeRoles('admin'), adminListBlogs);
router.get('/v1/admin/news', authenticateJWT, authorizeRoles('admin'), adminListNews);

// Yeni: admin içerik aksiyonları
router.patch('/v1/admin/blogs/:id/publish', authenticateJWT, authorizeRoles('admin'), validateObjectIdParam, handleValidation, adminTogglePublishBlog);
router.patch('/v1/admin/news/:id/active', authenticateJWT, authorizeRoles('admin'), validateObjectIdParam, handleValidation, adminToggleActiveNews);
router.delete('/v1/admin/blogs/:id', authenticateJWT, authorizeRoles('admin'), validateObjectIdParam, handleValidation, adminDeleteBlog);
router.delete('/v1/admin/news/:id', authenticateJWT, authorizeRoles('admin'), validateObjectIdParam, handleValidation, adminDeleteNews);

export default router;