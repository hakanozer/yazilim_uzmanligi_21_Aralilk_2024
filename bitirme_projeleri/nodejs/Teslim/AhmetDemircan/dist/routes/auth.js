"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registerController_1 = require("../controllers/registerController");
const loginController_1 = require("../controllers/loginController");
const profileController_1 = require("../controllers/profileController");
const authController_1 = require("../controllers/authController");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const ValidationChainsExpress_1 = require("../middleware/ValidationChainsExpress");
const router = (0, express_1.Router)();
router.get('/register', registerController_1.registerForm);
router.post('/register', ValidationChainsExpress_1.authRegisterRules, ValidationChainsExpress_1.handleValidation, registerController_1.register);
router.get('/login', loginController_1.loginForm);
router.post('/login', ValidationChainsExpress_1.authLoginRules, ValidationChainsExpress_1.handleValidation, loginController_1.login);
// Profil EJS sayfası ve formları
router.get('/profile', authController_1.authenticateWeb, profileController_1.profilePage);
router.post('/profile/info', authController_1.authenticateWeb, ValidationChainsExpress_1.profileUpdateInfoRules, ValidationChainsExpress_1.handleValidation, profileController_1.updateProfileInfo);
router.post('/profile/password', authController_1.authenticateWeb, ValidationChainsExpress_1.profileChangePasswordRules, ValidationChainsExpress_1.handleValidation, profileController_1.changePassword);
router.post('/profile/picture', authController_1.authenticateWeb, (0, multer_1.default)({ dest: path_1.default.join(__dirname, '../../public/uploads/avatars') }).single('avatar'), profileController_1.uploadProfilePicture);
router.get('/profile/blogs', authController_1.authenticateWeb, profileController_1.myBlogs);
router.get('/profile/news', authController_1.authenticateWeb, profileController_1.myNews);
router.delete('/profile', authController_1.authenticateWeb, profileController_1.deleteMe);
router.get('/logout', profileController_1.logout);
exports.default = router;
