"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const apiBlogController_1 = require("../controllers/restControllers/apiBlogController");
const apiAuthController_1 = require("../controllers/restControllers/apiAuthController");
const apiSearchController_1 = require("../controllers/restControllers/apiSearchController");
const apiNewsController_1 = require("../controllers/restControllers/apiNewsController");
const apiCategoryController_1 = require("../controllers/restControllers/apiCategoryController");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const apiProfileController_1 = require("../controllers/restControllers/apiProfileController");
const ValidationChainsExpress_1 = require("../middleware/ValidationChainsExpress");
const apiCommentController_1 = require("../controllers/restControllers/apiCommentController");
const apiAdminController_1 = require("../controllers/restControllers/apiAdminController");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: 2 * 1024 * 1024, files: 1 },
    fileFilter: (_req, file, cb) => {
        const allowed = ['.png', '.jpg', '.jpeg', '.webp'];
        const ext = path_1.default.extname(file.originalname).toLowerCase();
        if (!allowed.includes(ext)) {
            cb(new Error('Sadece png/jpg/jpeg/webp dosyaları'), false);
            return;
        }
        cb(null, true);
    }
});
// v1 Blogs
router.get('/v1/blogs', apiBlogController_1.listBlogs);
router.get('/v1/blogs/search', ValidationChainsExpress_1.searchQueryRules, ValidationChainsExpress_1.handleValidation, apiSearchController_1.searchBlogs);
router.get('/v1/search/blogs', ValidationChainsExpress_1.searchQueryRules, ValidationChainsExpress_1.handleValidation, apiSearchController_1.searchBlogs);
// Yeni: v1 News arama
router.get('/v1/search/news', ValidationChainsExpress_1.searchQueryRules, ValidationChainsExpress_1.handleValidation, apiSearchController_1.searchNews);
router.get('/v1/blogs/:id', ValidationChainsExpress_1.validateObjectIdParam, ValidationChainsExpress_1.handleValidation, apiBlogController_1.getBlog);
router.post('/v1/blogs', authController_1.authenticateJWT, ValidationChainsExpress_1.blogCreateRules, ValidationChainsExpress_1.handleValidation, apiBlogController_1.createBlog);
router.put('/v1/blogs/:id', authController_1.authenticateJWT, ValidationChainsExpress_1.validateObjectIdParam, ValidationChainsExpress_1.blogUpdateRules, ValidationChainsExpress_1.handleValidation, apiBlogController_1.updateBlog);
router.delete('/v1/blogs/:id', authController_1.authenticateJWT, ValidationChainsExpress_1.validateObjectIdParam, ValidationChainsExpress_1.handleValidation, apiBlogController_1.deleteBlog);
router.post('/v1/blogs/:id/like', authController_1.authenticateJWT, ValidationChainsExpress_1.reactionParamRules, ValidationChainsExpress_1.handleValidation, apiBlogController_1.likeBlog);
router.post('/v1/blogs/:id/dislike', authController_1.authenticateJWT, ValidationChainsExpress_1.reactionParamRules, ValidationChainsExpress_1.handleValidation, apiBlogController_1.dislikeBlog);
// v1 News
router.get('/v1/news', apiNewsController_1.listNews);
router.get('/v1/news/:id', ValidationChainsExpress_1.validateObjectIdParam, ValidationChainsExpress_1.handleValidation, apiNewsController_1.getNews);
router.post('/v1/news', authController_1.authenticateJWT, (0, authController_1.authorizeRoles)('admin', 'author'), ValidationChainsExpress_1.newsCreateRules, ValidationChainsExpress_1.handleValidation, apiNewsController_1.createNews);
router.put('/v1/news/:id', authController_1.authenticateJWT, (0, authController_1.authorizeRoles)('admin', 'author'), ValidationChainsExpress_1.validateObjectIdParam, ValidationChainsExpress_1.newsUpdateRules, ValidationChainsExpress_1.handleValidation, apiNewsController_1.updateNews);
router.delete('/v1/news/:id', authController_1.authenticateJWT, (0, authController_1.authorizeRoles)('admin', 'author'), ValidationChainsExpress_1.validateObjectIdParam, ValidationChainsExpress_1.handleValidation, apiNewsController_1.deleteNews);
router.post('/v1/news/:id/like', authController_1.authenticateJWT, ValidationChainsExpress_1.reactionParamRules, ValidationChainsExpress_1.handleValidation, apiNewsController_1.likeNews);
router.post('/v1/news/:id/dislike', authController_1.authenticateJWT, ValidationChainsExpress_1.reactionParamRules, ValidationChainsExpress_1.handleValidation, apiNewsController_1.dislikeNews);
// v1 Comments
router.get('/v1/comments', authController_1.authenticateJWT, apiCommentController_1.listComments);
router.get('/v1/blogs/:id/comments', ValidationChainsExpress_1.validateObjectIdParam, ValidationChainsExpress_1.handleValidation, apiCommentController_1.listBlogComments);
router.get('/v1/news/:id/comments', ValidationChainsExpress_1.validateObjectIdParam, ValidationChainsExpress_1.handleValidation, apiCommentController_1.listNewsComments);
router.post('/v1/comments', authController_1.authenticateJWT, ValidationChainsExpress_1.commentCreateRules, ValidationChainsExpress_1.handleValidation, apiCommentController_1.createComment);
router.put('/v1/comments/:id', authController_1.authenticateJWT, ValidationChainsExpress_1.validateObjectIdParam, ValidationChainsExpress_1.commentUpdateRules, ValidationChainsExpress_1.handleValidation, apiCommentController_1.updateComment);
router.delete('/v1/comments/:id', authController_1.authenticateJWT, ValidationChainsExpress_1.validateObjectIdParam, ValidationChainsExpress_1.handleValidation, apiCommentController_1.deleteComment);
// v1 Categories
router.get('/v1/categories', apiCategoryController_1.listCategories);
router.get('/v1/categories/:id', ValidationChainsExpress_1.validateObjectIdParam, ValidationChainsExpress_1.handleValidation, apiCategoryController_1.getCategory);
router.post('/v1/categories', authController_1.authenticateJWT, (0, authController_1.authorizeRoles)('admin'), ValidationChainsExpress_1.categoryCreateRules, ValidationChainsExpress_1.handleValidation, apiCategoryController_1.createCategory);
// v1 Auth
router.post('/v1/auth/register', ValidationChainsExpress_1.authRegisterRules, ValidationChainsExpress_1.handleValidation, apiAuthController_1.register);
router.post('/v1/auth/login', ValidationChainsExpress_1.authLoginRules, ValidationChainsExpress_1.handleValidation, apiAuthController_1.login);
router.get('/v1/auth/profile', authController_1.authenticateJWT, apiAuthController_1.profile);
router.post('/v1/auth/refresh', authController_1.authenticateJWT, apiAuthController_1.refresh);
router.post('/v1/auth/logout', authController_1.authenticateJWT, apiAuthController_1.logout);
// v1 Profile (JWT)
router.get('/v1/profile', authController_1.authenticateJWT, apiProfileController_1.getMyProfile);
router.put('/v1/profile', authController_1.authenticateJWT, ValidationChainsExpress_1.profileUpdateInfoRules, ValidationChainsExpress_1.handleValidation, apiProfileController_1.updateMyInfo);
router.post('/v1/profile/password', authController_1.authenticateJWT, ValidationChainsExpress_1.profileChangePasswordRules, ValidationChainsExpress_1.handleValidation, apiProfileController_1.changeMyPassword);
router.post('/v1/profile/picture', authController_1.authenticateJWT, upload.single('avatar'), apiProfileController_1.uploadMyAvatar);
router.delete('/v1/profile', authController_1.authenticateJWT, apiProfileController_1.deleteMe);
// v1 Admin (JWT + admin)
router.delete('/v1/admin/users/:id', authController_1.authenticateJWT, (0, authController_1.authorizeRoles)('admin'), ValidationChainsExpress_1.validateObjectIdParam, ValidationChainsExpress_1.handleValidation, apiProfileController_1.adminDeleteUser);
router.put('/v1/admin/users/:id/roles', authController_1.authenticateJWT, (0, authController_1.authorizeRoles)('admin'), ValidationChainsExpress_1.validateObjectIdParam, ValidationChainsExpress_1.handleValidation, apiAdminController_1.adminUpdateUserRoles);
// Yeni: admin listeleri
router.get('/v1/admin/users', authController_1.authenticateJWT, (0, authController_1.authorizeRoles)('admin'), apiAdminController_1.adminListUsers);
router.get('/v1/admin/blogs', authController_1.authenticateJWT, (0, authController_1.authorizeRoles)('admin'), apiAdminController_1.adminListBlogs);
router.get('/v1/admin/news', authController_1.authenticateJWT, (0, authController_1.authorizeRoles)('admin'), apiAdminController_1.adminListNews);
// Yeni: admin içerik aksiyonları
router.patch('/v1/admin/blogs/:id/publish', authController_1.authenticateJWT, (0, authController_1.authorizeRoles)('admin'), ValidationChainsExpress_1.validateObjectIdParam, ValidationChainsExpress_1.handleValidation, apiAdminController_1.adminTogglePublishBlog);
router.patch('/v1/admin/news/:id/active', authController_1.authenticateJWT, (0, authController_1.authorizeRoles)('admin'), ValidationChainsExpress_1.validateObjectIdParam, ValidationChainsExpress_1.handleValidation, apiAdminController_1.adminToggleActiveNews);
router.delete('/v1/admin/blogs/:id', authController_1.authenticateJWT, (0, authController_1.authorizeRoles)('admin'), ValidationChainsExpress_1.validateObjectIdParam, ValidationChainsExpress_1.handleValidation, apiAdminController_1.adminDeleteBlog);
router.delete('/v1/admin/news/:id', authController_1.authenticateJWT, (0, authController_1.authorizeRoles)('admin'), ValidationChainsExpress_1.validateObjectIdParam, ValidationChainsExpress_1.handleValidation, apiAdminController_1.adminDeleteNews);
exports.default = router;
