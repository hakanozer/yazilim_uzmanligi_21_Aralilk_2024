"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogController_1 = require("../controllers/blogController");
const authController_1 = require("../controllers/authController");
const apiBlogController_1 = require("../controllers/restControllers/apiBlogController");
const ValidationChainsExpress_1 = require("../middleware/ValidationChainsExpress");
const router = (0, express_1.Router)();
router.get('/', authController_1.authenticateWeb, blogController_1.listBlogsPage);
router.get('/new', authController_1.authenticateWeb, blogController_1.newBlogForm);
router.get('/:id/edit', authController_1.authenticateWeb, ValidationChainsExpress_1.validateObjectIdParam, ValidationChainsExpress_1.handleValidation, blogController_1.editBlogForm);
router.get('/:id', authController_1.authenticateWeb, ValidationChainsExpress_1.validateObjectIdParam, ValidationChainsExpress_1.handleValidation, blogController_1.showBlogPage);
router.post('/', authController_1.authenticateWeb, ValidationChainsExpress_1.blogCreateRules, ValidationChainsExpress_1.handleValidation, blogController_1.createBlog);
router.patch('/:id', authController_1.authenticateWeb, ValidationChainsExpress_1.validateObjectIdParam, ValidationChainsExpress_1.blogUpdateRules, ValidationChainsExpress_1.handleValidation, blogController_1.updateBlog);
router.delete('/:id', authController_1.authenticateWeb, ValidationChainsExpress_1.validateObjectIdParam, ValidationChainsExpress_1.handleValidation, blogController_1.deleteBlog);
// Yeni: yayın durumu ucu
router.patch('/:id/publish', authController_1.authenticateWeb, ValidationChainsExpress_1.blogTogglePublishRules, ValidationChainsExpress_1.handleValidation, blogController_1.togglePublish);
// Blog reactions (web)
router.post('/:id/like', authController_1.authenticateWeb, ValidationChainsExpress_1.reactionParamRules, ValidationChainsExpress_1.handleValidation, apiBlogController_1.likeBlog);
router.post('/:id/dislike', authController_1.authenticateWeb, ValidationChainsExpress_1.reactionParamRules, ValidationChainsExpress_1.handleValidation, apiBlogController_1.dislikeBlog);
// Form fallback’ları (PATCH/DELETE desteklemeyen durumlar için)
router.post('/:id', authController_1.authenticateWeb, ValidationChainsExpress_1.validateObjectIdParam, ValidationChainsExpress_1.blogUpdateRules, ValidationChainsExpress_1.handleValidation, blogController_1.updateBlog);
router.post('/:id/delete', authController_1.authenticateWeb, ValidationChainsExpress_1.validateObjectIdParam, ValidationChainsExpress_1.handleValidation, blogController_1.deleteBlog);
exports.default = router;
