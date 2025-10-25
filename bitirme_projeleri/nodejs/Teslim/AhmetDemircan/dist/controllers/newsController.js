"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editNewsForm = exports.createNews = exports.showNewsPage = exports.listNewsPage = void 0;
exports.newNewsForm = newNewsForm;
const newsModel_1 = __importDefault(require("../models/newsModel"));
const asyncHandler_1 = require("../utils/asyncHandler");
const categoriesModel_1 = __importDefault(require("../models/categoriesModel"));
const authService_1 = require("../services/authService");
exports.listNewsPage = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const limit = 9;
    const totalCount = await newsModel_1.default.countDocuments({ isActive: true });
    const totalPages = Math.max(1, Math.ceil(totalCount / limit));
    const currentPage = Math.min(Math.max(Number(req.query.page) || 1, 1), totalPages);
    const skip = (currentPage - 1) * limit;
    const items = await newsModel_1.default.find({ isActive: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('author', 'name')
        .populate('category', 'name')
        .lean();
    const displayNews = items.map((n) => {
        const raw = typeof n.content === 'string' ? n.content : '';
        const plain = raw.replace(/<[^>]+>/g, '').trim();
        const excerpt = plain.length > 220 ? plain.slice(0, 220) + '…' : plain;
        return { ...n, excerpt };
    });
    res.render('news/index', {
        title: 'Haberler',
        news: displayNews,
        currentPage,
        totalPages
    });
});
exports.showNewsPage = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const item = await newsModel_1.default.findById(req.params.id)
        .populate('author', 'name')
        .populate('category', 'name')
        .lean();
    if (!item)
        return res.status(404).render('errors/404', { title: '404 - Haber Bulunamadı' });
    res.render('news/show', { title: item.title, news: item });
});
// newNewsForm (tek tanım olacak şekilde)
async function newNewsForm(req, res) {
    const user = req.user;
    const userRoles = Array.isArray(user?.roles) ? user.roles : user?.roles ? [user.roles] : [];
    const allowed = userRoles.includes('admin') || userRoles.includes('author');
    if (!allowed)
        return res.status(403).render('errors/403', { title: '403 - Yetkisiz' });
    const categories = await categoriesModel_1.default.find({ isActive: true, kind: { $in: ['news', 'both'] } })
        .sort({ name: 1 })
        .lean();
    return res.render('news/new', { title: 'Yeni Haber', categories });
}
// İsteğe bağlı: Web’den JSON ile haber oluşturma (form yerine AJAX kullanıyorsanız)
// createNews (AppError ve asyncHandler ile)
exports.createNews = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    if (!user)
        throw new authService_1.AppError(401, 'Yetkisiz: giriş yapın');
    const { title, content, category, isActive, imageUrl } = req.body;
    if (!title?.trim() || !content?.trim()) {
        throw new authService_1.AppError(400, 'Başlık ve içerik zorunlu');
    }
    const doc = await newsModel_1.default.create({
        title: title.trim(),
        content,
        category: category || undefined,
        author: user.sub,
        isActive: !!isActive,
        imageUrl: imageUrl?.trim() || undefined
    });
    return res.status(201).json({ ok: true, item: doc });
});
// Düzenleme formu
exports.editNewsForm = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    if (!user)
        throw new authService_1.AppError(401, 'Yetkisiz: giriş yapın');
    const news = await newsModel_1.default.findById(req.params.id);
    if (!news) {
        return res.status(404).render('errors/404', { title: '404 - Haber Bulunamadı' });
    }
    const isOwner = String(news.author) === String(user.sub);
    const isAdmin = Array.isArray(user.roles) && user.roles.includes('admin');
    if (!isOwner && !isAdmin)
        throw new authService_1.AppError(403, 'Bu haberi düzenleme yetkiniz yok');
    const categories = await categoriesModel_1.default.find({ isActive: true, kind: { $in: ['news', 'both'] } })
        .sort({ name: 1 })
        .lean();
    return res.render('news/edit', {
        title: 'Haberi Düzenle',
        news: news.toObject(),
        categories,
        isOwner,
        isAdmin
    });
});
