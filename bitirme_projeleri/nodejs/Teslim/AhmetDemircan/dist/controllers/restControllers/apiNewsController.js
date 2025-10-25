"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dislikeNews = exports.likeNews = exports.deleteNews = exports.updateNews = exports.createNews = exports.getNews = exports.listNews = void 0;
const newsModel_1 = __importDefault(require("../../models/newsModel"));
const asyncHandler_1 = require("../../utils/asyncHandler");
const authService_1 = require("../../services/authService");
function isOwnerOrAdmin(user, author) {
    if (!user)
        return false;
    const isOwner = String(author) === String(user.sub);
    const isAdmin = Array.isArray(user.roles) ? user.roles.includes('admin') : user.roles === 'admin';
    return isOwner || isAdmin;
}
exports.listNews = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const items = await newsModel_1.default.find()
        .sort({ createdAt: -1 })
        .populate('author', 'name email')
        .populate('category', 'name')
        .lean();
    return res.json({ items });
});
exports.getNews = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const item = await newsModel_1.default.findById(req.params.id)
        .populate('author', 'name email')
        .populate('category', 'name')
        .lean();
    if (!item)
        throw new authService_1.AppError(404, 'Haber bulunamadı');
    return res.json({ item });
});
// createNews (başı değişmeden kalır)
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
// updateNews / deleteNews / like/dislike aynı dosyada kalabilir; istedikçe asyncHandler’a geçirilebilir.
exports.updateNews = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    const news = await newsModel_1.default.findById(req.params.id);
    if (!news)
        throw new authService_1.AppError(404, 'Haber bulunamadı');
    const isAdmin = Array.isArray(user?.roles) ? user.roles.includes('admin') : (user?.roles === 'admin');
    const owner = user && String(news.author) === String(user.sub);
    if (!owner && !isAdmin)
        throw new authService_1.AppError(403, 'Yetkisiz');
    // Admin sahibi değilse: yalnızca aktif/pasif durumunu değiştirebilir
    if (isAdmin && !owner) {
        const { isActive } = req.body;
        const forbiddenKeys = ['title', 'content', 'category', 'imageUrl']
            .filter(k => typeof req.body[k] !== 'undefined');
        if (forbiddenKeys.length) {
            throw new authService_1.AppError(403, 'Admin, sahibi olmadığı içeriğin başlık/içerik/görsel alanlarını değiştiremez');
        }
        if (typeof isActive !== 'boolean') {
            throw new authService_1.AppError(400, 'isActive alanı boolean olmalı');
        }
        news.isActive = isActive;
        await news.save();
        return res.json({ ok: true, item: news });
    }
    const { title, content, category, isActive, imageUrl } = req.body;
    news.title = typeof title !== 'undefined' ? title : news.title;
    news.content = typeof content !== 'undefined' ? content : news.content;
    news.category = typeof category !== 'undefined' ? category : news.category;
    news.isActive = typeof isActive === 'boolean' ? isActive : news.isActive;
    if (typeof imageUrl !== 'undefined') {
        news.imageUrl = imageUrl?.trim() || undefined;
    }
    await news.save();
    return res.json({ ok: true, item: news });
});
exports.deleteNews = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    const news = await newsModel_1.default.findById(req.params.id);
    if (!news)
        throw new authService_1.AppError(404, 'Haber bulunamadı');
    if (!isOwnerOrAdmin(user, news.author))
        throw new authService_1.AppError(403, 'Yetkisiz');
    await news.deleteOne();
    return res.json({ ok: true });
});
// Yeni: beğeni endpoint’i
exports.likeNews = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    if (!user)
        throw new authService_1.AppError(401, 'Yetkisiz: giriş yapın');
    const news = await newsModel_1.default.findById(req.params.id);
    if (!news)
        throw new authService_1.AppError(404, 'Haber bulunamadı');
    const userId = user.sub;
    const likesArray = Array.isArray(news.likesID) ? news.likesID : [];
    const dislikesArray = Array.isArray(news.dislikesID) ? news.dislikesID : [];
    if (!Array.isArray(news.likesID) || !Array.isArray(news.dislikesID)) {
        await newsModel_1.default.updateOne({ _id: news._id }, { $set: { likesID: likesArray, dislikesID: dislikesArray } });
    }
    const likedByUser = likesArray.some((id) => String(id) === String(userId));
    const dislikedByUser = dislikesArray.some((id) => String(id) === String(userId));
    let action = 'liked';
    let updated = null;
    if (likedByUser) {
        updated = await newsModel_1.default.findByIdAndUpdate(req.params.id, { $pull: { likesID: userId } }, { new: true }).lean();
        action = 'unliked';
    }
    else if (dislikedByUser) {
        updated = await newsModel_1.default.findByIdAndUpdate(req.params.id, { $pull: { dislikesID: userId }, $addToSet: { likesID: userId } }, { new: true }).lean();
        action = 'switched_to_like';
    }
    else {
        updated = await newsModel_1.default.findByIdAndUpdate(req.params.id, { $addToSet: { likesID: userId } }, { new: true }).lean();
        action = 'liked';
    }
    return res.json({
        ok: true,
        action,
        likesCount: Array.isArray(updated?.likesID) ? updated.likesID.length : 0,
        dislikesCount: Array.isArray(updated?.dislikesID) ? updated.dislikesID.length : 0
    });
});
// Yeni: beğenmeme endpoint’i
exports.dislikeNews = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    if (!user)
        throw new authService_1.AppError(401, 'Yetkisiz: giriş yapın');
    const news = await newsModel_1.default.findById(req.params.id);
    if (!news)
        throw new authService_1.AppError(404, 'Haber bulunamadı');
    const userId = user.sub;
    const likesArray = Array.isArray(news.likesID) ? news.likesID : [];
    const dislikesArray = Array.isArray(news.dislikesID) ? news.dislikesID : [];
    if (!Array.isArray(news.likesID) || !Array.isArray(news.dislikesID)) {
        await newsModel_1.default.updateOne({ _id: news._id }, { $set: { likesID: likesArray, dislikesID: dislikesArray } });
    }
    const likedByUser = likesArray.some((id) => String(id) === String(userId));
    const dislikedByUser = dislikesArray.some((id) => String(id) === String(userId));
    let action = 'disliked';
    let updated = null;
    if (dislikedByUser) {
        updated = await newsModel_1.default.findByIdAndUpdate(req.params.id, { $pull: { dislikesID: userId } }, { new: true }).lean();
        action = 'undisliked';
    }
    else if (likedByUser) {
        updated = await newsModel_1.default.findByIdAndUpdate(req.params.id, { $pull: { likesID: userId }, $addToSet: { dislikesID: userId } }, { new: true }).lean();
        action = 'switched_to_dislike';
    }
    else {
        updated = await newsModel_1.default.findByIdAndUpdate(req.params.id, { $addToSet: { dislikesID: userId } }, { new: true }).lean();
        action = 'disliked';
    }
    return res.json({
        ok: true,
        action,
        likesCount: Array.isArray(updated?.likesID) ? updated.likesID.length : 0,
        dislikesCount: Array.isArray(updated?.dislikesID) ? updated.dislikesID.length : 0
    });
});
