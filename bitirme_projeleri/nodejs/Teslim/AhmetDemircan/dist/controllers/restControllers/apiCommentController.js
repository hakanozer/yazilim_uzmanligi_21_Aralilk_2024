"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.createComment = exports.listNewsComments = exports.listBlogComments = exports.listComments = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const authService_1 = require("../../services/authService");
const commentModel_1 = __importDefault(require("../../models/commentModel"));
const blogModel_1 = __importDefault(require("../../models/blogModel"));
const newsModel_1 = __importDefault(require("../../models/newsModel"));
function isAdmin(req) {
    const roles = (req.user?.roles) || [];
    return Array.isArray(roles) && roles.includes('admin');
}
function toPublic(comment) {
    const author = comment.author && typeof comment.author === 'object'
        ? { id: String(comment.author._id), name: comment.author.name, profilePicture: comment.author.profilePicture }
        : { id: String(comment.author) };
    return {
        id: String(comment._id),
        content: comment.content,
        author,
        subjectModel: comment.subjectModel,
        subject: String(comment.subject),
        isActive: !!comment.isActive,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt
    };
}
// Yorum yönetimi: listeleme (user: kendi yorumları, admin: tüm yorumlar)
exports.listComments = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const me = req.user;
    if (!me)
        throw new authService_1.AppError(401, 'Yetkisiz: token gerekli');
    const admin = isAdmin(req);
    const { author, subjectModel, subject, isActive } = req.query;
    const filter = {};
    // Kullanıcı: sadece kendi yorumları
    if (!admin) {
        filter.author = me.sub;
    }
    else {
        // Admin: opsiyonel filtreler
        if (author)
            filter.author = author;
        if (subjectModel)
            filter.subjectModel = subjectModel;
        if (subject)
            filter.subject = subject;
        if (typeof isActive !== 'undefined') {
            if (isActive === 'true')
                filter.isActive = true;
            else if (isActive === 'false')
                filter.isActive = false;
        }
    }
    // Her iki rolde de opsiyonel konu filtreleri kullanılabilsin
    if (!admin) {
        if (subjectModel)
            filter.subjectModel = subjectModel;
        if (subject)
            filter.subject = subject;
    }
    const items = await commentModel_1.default.find(filter)
        .sort({ createdAt: -1 })
        .populate('author', '_id name profilePicture')
        .lean();
    return res.json({ items: items.map(toPublic) });
});
// Blog için yorumları listele
exports.listBlogComments = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const exists = await blogModel_1.default.exists({ _id: id });
    if (!exists)
        throw new authService_1.AppError(404, 'Blog bulunamadı');
    const isAdminUser = isAdmin(req);
    const filter = { subjectModel: 'Blog', subject: id };
    if (!isAdminUser)
        filter.isActive = true;
    const items = await commentModel_1.default.find(filter)
        .sort({ createdAt: -1 })
        .populate('author', '_id name profilePicture')
        .lean();
    return res.json({ items: items.map(toPublic) });
});
// News için yorumları listele
exports.listNewsComments = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const exists = await newsModel_1.default.exists({ _id: id });
    if (!exists)
        throw new authService_1.AppError(404, 'Haber bulunamadı');
    const isAdminUser = isAdmin(req);
    const filter = { subjectModel: 'News', subject: id };
    if (!isAdminUser)
        filter.isActive = true;
    const items = await commentModel_1.default.find(filter)
        .sort({ createdAt: -1 })
        .populate('author', '_id name profilePicture')
        .lean();
    return res.json({ items: items.map(toPublic) });
});
// Yorum oluştur
// createComment içinde
exports.createComment = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const me = req.user;
    if (!me)
        throw new authService_1.AppError(401, 'Yetkisiz: token gerekli');
    const { content, subjectModel, subject } = req.body;
    if (!content || !subjectModel || !subject)
        throw new authService_1.AppError(400, 'content, subjectModel, subject gerekli');
    if (subjectModel === 'Blog') {
        const exists = await blogModel_1.default.exists({ _id: subject });
        if (!exists)
            throw new authService_1.AppError(404, 'Blog bulunamadı');
    }
    else if (subjectModel === 'News') {
        const exists = await newsModel_1.default.exists({ _id: subject });
        if (!exists)
            throw new authService_1.AppError(404, 'Haber bulunamadı');
    }
    else {
        throw new authService_1.AppError(400, 'subjectModel Blog veya News olmalı');
    }
    // Tek yorum kuralı: varsa mevcut yorumu güncelle/yeniden etkinleştir
    const existing = await commentModel_1.default.findOne({ author: me.sub, subjectModel, subject });
    if (existing) {
        existing.content = String(content).trim();
        existing.isActive = true;
        await existing.save();
        await existing.populate('author', '_id name profilePicture');
        return res.status(200).json({ ok: true, item: toPublic(existing) });
    }
    const created = await commentModel_1.default.create({
        content: String(content).trim(),
        author: me.sub,
        subjectModel,
        subject,
        isActive: true
    });
    if (subjectModel === 'Blog') {
        await blogModel_1.default.findByIdAndUpdate(subject, { $push: { comments: created._id } });
    }
    else {
        await newsModel_1.default.findByIdAndUpdate(subject, { $push: { comments: created._id } });
    }
    await created.populate('author', '_id name profilePicture');
    return res.status(201).json({ ok: true, item: toPublic(created) });
});
// Yorum güncelle (sadece sahibi veya admin)
exports.updateComment = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const me = req.user;
    if (!me)
        throw new authService_1.AppError(401, 'Yetkisiz: token gerekli');
    const { id } = req.params;
    const { content, isActive } = req.body;
    const comment = await commentModel_1.default.findById(id);
    if (!comment)
        throw new authService_1.AppError(404, 'Yorum bulunamadı');
    const admin = isAdmin(req);
    const owner = String(comment.author) === me.sub;
    let changed = false;
    if (typeof content === 'string') {
        if (!owner && !admin)
            throw new authService_1.AppError(403, 'Yalnızca sahibi veya admin güncelleyebilir');
        if (!content.trim())
            throw new authService_1.AppError(400, 'content gerekli');
        comment.content = content.trim();
        changed = true;
    }
    if (typeof isActive === 'boolean') {
        if (!admin)
            throw new authService_1.AppError(403, 'isActive sadece admin tarafından değiştirilebilir');
        comment.set('isActive', isActive);
        changed = true;
    }
    if (!changed)
        throw new authService_1.AppError(400, 'Güncellenecek alan belirtilmeli');
    await comment.save();
    await comment.populate('author', '_id name profilePicture');
    return res.json({ ok: true, item: toPublic(comment) });
});
// Yorum sil (sadece sahibi veya admin)
exports.deleteComment = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const me = req.user;
    if (!me)
        throw new authService_1.AppError(401, 'Yetkisiz: token gerekli');
    const { id } = req.params;
    const comment = await commentModel_1.default.findById(id);
    if (!comment)
        throw new authService_1.AppError(404, 'Yorum bulunamadı');
    const owner = String(comment.author) === me.sub;
    if (!owner && !isAdmin(req))
        throw new authService_1.AppError(403, 'Yalnızca sahibi veya admin silebilir');
    const subjectId = String(comment.subject);
    const subjectModel = comment.subjectModel;
    await comment.deleteOne();
    // Parent’ten pull et
    if (subjectModel === 'Blog') {
        await blogModel_1.default.findByIdAndUpdate(subjectId, { $pull: { comments: comment._id } });
    }
    else if (subjectModel === 'News') {
        await newsModel_1.default.findByIdAndUpdate(subjectId, { $pull: { comments: comment._id } });
    }
    return res.json({ ok: true, id });
});
