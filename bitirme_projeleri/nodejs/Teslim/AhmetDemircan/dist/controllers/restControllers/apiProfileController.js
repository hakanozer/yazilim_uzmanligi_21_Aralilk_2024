"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminUpdateRoles = exports.adminDeleteUser = exports.deleteMe = exports.uploadMyAvatar = exports.changeMyPassword = exports.updateMyInfo = exports.getMyProfile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const asyncHandler_1 = require("../../utils/asyncHandler");
const validators_1 = require("../../utils/validators");
const authService_1 = require("../../services/authService");
// Yardımcı: isAdmin
function isAdmin(req) {
    const roles = req.user?.roles || [];
    return Array.isArray(roles) && roles.includes('admin');
}
// Mevcut kullanıcı profili (JWT ile)
exports.getMyProfile = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const me = req.user;
    if (!me)
        throw new authService_1.AppError(401, 'Yetkisiz: token gerekli');
    const user = await userModel_1.default.findById(me.sub)
        .select('_id email name roles profilePicture createdAt updatedAt')
        .lean();
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
// Ad ve e‑posta güncelleme
exports.updateMyInfo = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const me = req.user;
    if (!me)
        throw new authService_1.AppError(401, 'Yetkisiz: token gerekli');
    const { name, email } = req.body;
    if (email && !(0, validators_1.isValidEmail)(email))
        throw new authService_1.AppError(400, 'Geçerli bir e‑posta girin');
    const exists = email ? await userModel_1.default.findOne({ email, _id: { $ne: me.sub } }).lean() : null;
    if (exists)
        throw new authService_1.AppError(409, 'Bu e‑posta zaten kayıtlı');
    const user = await userModel_1.default.findById(me.sub);
    if (!user)
        throw new authService_1.AppError(404, 'Kullanıcı bulunamadı');
    if (typeof name === 'string')
        user.name = name.trim();
    if (typeof email === 'string')
        user.email = email.trim().toLowerCase();
    await user.save();
    return res.json({
        message: 'Profil güncellendi',
        user: { id: String(user._id), name: user.name, email: user.email }
    });
});
// Şifre değiştirme
exports.changeMyPassword = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const me = req.user;
    if (!me)
        throw new authService_1.AppError(401, 'Yetkisiz: token gerekli');
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword)
        throw new authService_1.AppError(400, 'Mevcut ve yeni şifre gerekli');
    if (!(0, validators_1.isValidPassword)(newPassword))
        throw new authService_1.AppError(400, 'Şifre en az 8 karakter olmalı');
    const user = await userModel_1.default.findById(me.sub);
    if (!user)
        throw new authService_1.AppError(404, 'Kullanıcı bulunamadı');
    const ok = await user.comparePassword(currentPassword);
    if (!ok)
        throw new authService_1.AppError(400, 'Mevcut şifre yanlış');
    user.password = newPassword; // pre-save hook ile hash’lenir
    await user.save();
    return res.json({ message: 'Şifre güncellendi' });
});
// Profil fotoğrafı yükleme (server-side)
exports.uploadMyAvatar = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const me = req.user;
    if (!me)
        throw new authService_1.AppError(401, 'Yetkisiz: token gerekli');
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
    const filename = `${me.sub}_${Date.now()}${safeExt}`;
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
    const user = await userModel_1.default.findById(me.sub);
    if (!user)
        throw new authService_1.AppError(404, 'Kullanıcı bulunamadı');
    user.profilePicture = `/uploads/profiles/${filename}`;
    await user.save();
    return res.json({ message: 'Profil fotoğrafı güncellendi', profilePicture: user.profilePicture });
});
// Kendi hesabını silme
exports.deleteMe = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const me = req.user;
    if (!me)
        throw new authService_1.AppError(401, 'Yetkisiz: token gerekli');
    const user = await userModel_1.default.findByIdAndDelete(me.sub);
    if (!user)
        throw new authService_1.AppError(404, 'Kullanıcı bulunamadı');
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
