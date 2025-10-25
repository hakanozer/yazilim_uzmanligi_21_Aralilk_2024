"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refresh = exports.profile = exports.login = exports.register = void 0;
const authService_1 = require("../../services/authService");
const userModel_1 = __importDefault(require("../../models/userModel"));
const authController_1 = require("../../controllers/authController");
const asyncHandler_1 = require("../../utils/asyncHandler");
exports.register = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const created = await (0, authService_1.registerUser)(req.body);
    return res.status(201).json({
        id: created._id,
        email: created.email,
        name: created.name,
        roles: created.roles
    });
});
exports.login = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { user, token } = await (0, authService_1.loginUser)(req.body);
    return res.status(200).json({
        token,
        user: { id: user._id, email: user.email, name: user.name, roles: user.roles }
    });
});
exports.profile = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const decoded = req.user;
    if (!decoded)
        throw new authService_1.AppError(401, 'Yetkisiz: token gerekli');
    const user = await userModel_1.default.findById(decoded.sub)
        .select('_id email name roles createdAt updatedAt')
        .lean();
    if (!user)
        throw new authService_1.AppError(404, 'Kullanıcı bulunamadı');
    return res.status(200).json({
        user: { id: user._id, email: user.email, name: user.name, roles: user.roles }
    });
});
exports.refresh = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const decoded = req.user;
    if (!decoded)
        throw new authService_1.AppError(401, 'Yetkisiz: token gerekli');
    const user = await userModel_1.default.findById(decoded.sub);
    if (!user)
        throw new authService_1.AppError(404, 'Kullanıcı bulunamadı');
    const token = (0, authController_1.signToken)(user);
    return res.status(200).json({ token });
});
exports.logout = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    res.setHeader('Set-Cookie', 'token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax');
    return res.status(200).json({ ok: true, message: 'Çıkış yapıldı' });
});
