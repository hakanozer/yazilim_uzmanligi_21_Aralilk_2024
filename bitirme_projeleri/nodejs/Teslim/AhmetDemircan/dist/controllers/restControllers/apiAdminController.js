"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminUpdateUserRoles = exports.adminToggleActiveNews = exports.adminTogglePublishBlog = exports.adminDeleteNews = exports.adminDeleteBlog = exports.adminListNews = exports.adminListBlogs = exports.adminListUsers = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const authService_1 = require("../../services/authService");
const blogModel_1 = __importDefault(require("../../models/blogModel"));
const newsModel_1 = __importDefault(require("../../models/newsModel"));
const userModel_1 = __importDefault(require("../../models/userModel"));
exports.adminListUsers = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const items = await userModel_1.default.find().select('_id name email roles createdAt').lean();
    return res.json({ items });
});
exports.adminListBlogs = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const items = await blogModel_1.default.find().sort({ createdAt: -1 }).lean();
    return res.json({ items });
});
exports.adminListNews = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const items = await newsModel_1.default.find().sort({ createdAt: -1 }).lean();
    return res.json({ items });
});
exports.adminDeleteBlog = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const blog = await blogModel_1.default.findById(req.params.id);
    if (!blog)
        throw new authService_1.AppError(404, 'Blog bulunamadı');
    await blog.deleteOne();
    return res.json({ ok: true });
});
exports.adminDeleteNews = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const news = await newsModel_1.default.findById(req.params.id);
    if (!news)
        throw new authService_1.AppError(404, 'Haber bulunamadı');
    await news.deleteOne();
    return res.json({ ok: true });
});
exports.adminTogglePublishBlog = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const blog = await blogModel_1.default.findById(req.params.id);
    if (!blog)
        throw new authService_1.AppError(404, 'Blog bulunamadı');
    const { publish } = req.body;
    if (typeof publish !== 'boolean')
        throw new authService_1.AppError(400, 'publish alanı boolean olmalı');
    blog.isPublished = publish;
    await blog.save();
    return res.json({ ok: true, item: blog });
});
exports.adminToggleActiveNews = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const news = await newsModel_1.default.findById(req.params.id);
    if (!news)
        throw new authService_1.AppError(404, 'Haber bulunamadı');
    const { active } = req.body;
    if (typeof active !== 'boolean')
        throw new authService_1.AppError(400, 'active alanı boolean olmalı');
    news.isActive = active;
    await news.save();
    return res.json({ ok: true, item: news });
});
exports.adminUpdateUserRoles = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const user = await userModel_1.default.findById(req.params.id);
    if (!user)
        throw new authService_1.AppError(404, 'Kullanıcı bulunamadı');
    const rolesInput = req.body.roles;
    let rolesArr = [];
    if (Array.isArray(rolesInput)) {
        rolesArr = rolesInput.map((r) => String(r).trim()).filter(Boolean);
    }
    else if (typeof rolesInput === 'string') {
        rolesArr = rolesInput.split(',').map((r) => r.trim()).filter(Boolean);
    }
    else {
        throw new authService_1.AppError(400, 'roles alanı string veya dizi olmalı');
    }
    const allowed = ['user', 'author', 'admin'];
    const newRoles = Array.from(new Set(rolesArr.filter((r) => allowed.includes(r))));
    if (!newRoles.length)
        throw new authService_1.AppError(400, 'En az bir geçerli rol girin (user, author, admin)');
    user.roles = newRoles;
    await user.save();
    return res.json({ ok: true, item: { _id: user._id, roles: user.roles } });
});
