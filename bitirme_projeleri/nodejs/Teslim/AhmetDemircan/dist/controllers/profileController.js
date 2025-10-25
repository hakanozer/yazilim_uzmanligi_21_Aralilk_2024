"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myNews = exports.myBlogs = exports.profilePage = exports.adminUpdateRoles = exports.adminDeleteUser = exports.deleteMe = exports.uploadProfilePicture = exports.changePassword = exports.updateProfileInfo = exports.getProfile = void 0;
exports.logout = logout;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const userModel_1 = __importDefault(require("../models/userModel"));
const validators_1 = require("../utils/validators");
const asyncHandler_1 = require("../utils/asyncHandler");
const authService_1 = require("../services/authService");
const blogModel_1 = __importDefault(require("../models/blogModel"));
const newsModel_1 = __importDefault(require("../models/newsModel"));
function logout(req, res) {
    req.session?.destroy(() => {
        res.clearCookie('token', { httpOnly: true, sameSite: 'lax' });
        return res.redirect('/');
    });
}
// Yardımcı: oturumdaki kullanıcı id'sini al
function getCurrentUserId(req) {
    const fromSession = req.session?.user?.sub;
    const fromReqUser = req.user?.sub;
    return String(fromSession || fromReqUser || '');
}
// Yardımcı: admin mi?
function isAdmin(req) {
    const roles = req.session?.user?.roles || req.user?.roles || [];
    return Array.isArray(roles) && roles.includes('admin');
}
// API/Web: profil verisi
exports.getProfile = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const userId = getCurrentUserId(req);
    if (!userId)
        throw new authService_1.AppError(401, 'Giriş gerekli');
    const user = await userModel_1.default.findById(userId).lean();
    if (!user)
        throw new authService_1.AppError(404, 'Kullanıcı bulunamadı');
    return res.json({
        user: {
            id: String(user._id),
            email: user.email,
            name: user.name,
            roles: user.roles,
            profilePicture: user.profilePicture
        }
    });
});
// API/Web: ad ve e‑posta güncelle
exports.updateProfileInfo = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const userId = getCurrentUserId(req);
    if (!userId)
        throw new authService_1.AppError(401, 'Giriş gerekli');
    const { name, email } = req.body;
    if (email && !(0, validators_1.isValidEmail)(email))
        throw new authService_1.AppError(400, 'Geçerli bir e‑posta girin');
    const exists = email ? await userModel_1.default.findOne({ email, _id: { $ne: userId } }).lean() : null;
    if (exists)
        throw new authService_1.AppError(409, 'Bu e‑posta zaten kayıtlı');
    const user = await userModel_1.default.findById(userId);
    if (!user)
        throw new authService_1.AppError(404, 'Kullanıcı bulunamadı');
    if (typeof name === 'string')
        user.name = name.trim();
    if (typeof email === 'string')
        user.email = email.trim().toLowerCase();
    await user.save();
    if (req.session?.user) {
        req.session.user.name = user.name;
        req.session.user.email = user.email;
    }
    return res.json({ message: 'Profil güncellendi', user: { id: String(user._id), name: user.name, email: user.email } });
});
// API/Web: şifre değiştir
exports.changePassword = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const userId = getCurrentUserId(req);
    if (!userId)
        throw new authService_1.AppError(401, 'Giriş gerekli');
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword)
        throw new authService_1.AppError(400, 'Mevcut ve yeni şifre gerekli');
    if (!(0, validators_1.isValidPassword)(newPassword))
        throw new authService_1.AppError(400, 'Şifre en az 8 karakter olmalı');
    const user = await userModel_1.default.findById(userId);
    if (!user)
        throw new authService_1.AppError(404, 'Kullanıcı bulunamadı');
    const ok = await user.comparePassword(currentPassword);
    if (!ok)
        throw new authService_1.AppError(400, 'Mevcut şifre yanlış');
    user.password = newPassword;
    await user.save();
    return res.json({ message: 'Şifre güncellendi' });
});
// API/Web: profil fotoğrafı yükle
exports.uploadProfilePicture = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const userId = getCurrentUserId(req);
    if (!userId)
        throw new authService_1.AppError(401, 'Giriş gerekli');
    const file = req.file;
    if (!file)
        throw new authService_1.AppError(400, 'Dosya gerekli');
    const allowed = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (file.mimetype && !allowed.includes(file.mimetype))
        throw new authService_1.AppError(400, 'Desteklenmeyen dosya tipi');
    const uploadsDir = path_1.default.join(process.cwd(), 'public', 'uploads', 'profiles');
    await fs_1.default.promises.mkdir(uploadsDir, { recursive: true });
    const ext = path_1.default.extname(file.originalname || '');
    const safeExt = ext && ['.png', '.jpg', '.jpeg', '.webp'].includes(ext.toLowerCase()) ? ext : '.png';
    const filename = `${userId}_${Date.now()}${safeExt}`;
    const targetPath = path_1.default.join(uploadsDir, filename);
    if (file.path) {
        await fs_1.default.promises.copyFile(file.path, targetPath);
    }
    else if (file.buffer) {
        await fs_1.default.promises.writeFile(targetPath, file.buffer);
    }
    else {
        throw new authService_1.AppError(400, 'Dosya içeriği okunamadı');
    }
    const user = await userModel_1.default.findById(userId);
    if (!user)
        throw new authService_1.AppError(404, 'Kullanıcı bulunamadı');
    user.profilePicture = `/uploads/profiles/${filename}`;
    await user.save();
    if (req.session?.user) {
        req.session.user.profilePicture = user.profilePicture;
    }
    return res.json({ message: 'Profil fotoğrafı güncellendi', profilePicture: user.profilePicture });
});
// API/Web: kendi hesabını sil
exports.deleteMe = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const userId = getCurrentUserId(req);
    if (!userId)
        throw new authService_1.AppError(401, 'Giriş gerekli');
    const user = await userModel_1.default.findByIdAndDelete(userId);
    if (!user)
        throw new authService_1.AppError(404, 'Kullanıcı bulunamadı');
    req.session?.destroy(() => { });
    return res.json({ message: 'Hesap silindi' });
});
// Admin: kullanıcı sil
exports.adminDeleteUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!isAdmin(req))
        throw new authService_1.AppError(403, 'Yalnızca admin kullanıcılar silebilir');
    const { id } = req.params;
    if (!id)
        throw new authService_1.AppError(400, 'Kullanıcı ID gerekli');
    const user = await userModel_1.default.findByIdAndDelete(id);
    if (!user)
        throw new authService_1.AppError(404, 'Kullanıcı bulunamadı');
    return res.json({ message: 'Kullanıcı silindi', id });
});
// Admin: roller güncelle
exports.adminUpdateRoles = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!isAdmin(req))
        throw new authService_1.AppError(403, 'Yalnızca admin kullanıcılar rol güncelleyebilir');
    const { id } = req.params;
    const { roles } = req.body;
    if (!id)
        throw new authService_1.AppError(400, 'Kullanıcı ID gerekli');
    if (!Array.isArray(roles) || roles.length === 0)
        throw new authService_1.AppError(400, 'Roller gerekli');
    const allowed = ['user', 'admin', 'author'];
    const sanitized = Array.from(new Set(roles)).filter((r) => allowed.includes(r));
    if (sanitized.length === 0)
        throw new authService_1.AppError(400, 'Geçerli roller sağlanmalı');
    const user = await userModel_1.default.findById(id);
    if (!user)
        throw new authService_1.AppError(404, 'Kullanıcı bulunamadı');
    user.roles = sanitized;
    await user.save();
    return res.json({ message: 'Roller güncellendi', user: { id: String(user._id), roles: user.roles } });
});
// EJS: Profil Ayarları Sayfası
exports.profilePage = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const sessionUser = req.session?.user;
    if (!sessionUser)
        return res.redirect('/auth/login');
    const tabParam = req.query.tab;
    const tab = typeof tabParam === 'string' ? tabParam : 'edit'; // edit | privacy | comments
    return res.render('auth/profile', {
        title: 'Profil',
        user: sessionUser,
        tab
    });
});
// Kullanıcının yazdığı blogları listele (JSON)
exports.myBlogs = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const userId = req.session?.user?.sub || req.user?.sub;
    if (!userId)
        throw new authService_1.AppError(401, 'Giriş gerekli');
    const docs = await blogModel_1.default.find({ author: userId }).sort({ createdAt: -1 }).lean();
    const blogs = docs.map((b) => ({
        id: String(b._id),
        title: b.title,
        coverImageUrl: b.coverImageUrl || null,
        isPublished: !!b.isPublished,
        publishedAt: b.publishedAt ? new Date(b.publishedAt).toISOString() : null
    }));
    return res.json({ ok: true, blogs });
});
// Kullanıcının yazdığı haberleri listele (JSON)
exports.myNews = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const userId = req.session?.user?.sub || req.user?.sub;
    if (!userId)
        throw new authService_1.AppError(401, 'Giriş gerekli');
    const docs = await newsModel_1.default.find({ author: userId }).sort({ createdAt: -1 }).lean();
    const news = docs.map((n) => ({
        id: String(n._id),
        title: n.title,
        imageUrl: n.imageUrl || null,
        isActive: !!n.isActive,
        createdAt: n.createdAt ? new Date(n.createdAt).toISOString() : null
    }));
    return res.json({ ok: true, news });
});
