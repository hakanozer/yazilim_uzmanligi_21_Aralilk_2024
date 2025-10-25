"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.togglePublish = exports.deleteBlog = exports.updateBlog = exports.editBlogForm = exports.newBlogForm = exports.showBlogPage = exports.listBlogsPage = exports.createBlog = void 0;
const blogModel_1 = __importDefault(require("../models/blogModel"));
const asyncHandler_1 = require("../utils/asyncHandler");
const authService_1 = require("../services/authService");
const categoriesModel_1 = __importDefault(require("../models/categoriesModel"));
exports.createBlog = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    if (!user)
        throw new authService_1.AppError(401, 'Yetkisiz: giriş yapın');
    const { title, content, tags, categories, coverImageUrl, isPublished } = req.body;
    if (!title?.trim() || !content?.trim()) {
        throw new authService_1.AppError(400, 'Başlık ve içerik zorunlu');
    }
    const normalizedCategories = Array.isArray(categories)
        ? categories.map((c) => String(c).trim()).filter(Boolean)
        : typeof categories === 'string' && categories.length
            ? categories.split(',').map((c) => c.trim()).filter(Boolean)
            : [];
    const doc = await blogModel_1.default.create({
        title: title.trim(),
        content,
        tags,
        categories: normalizedCategories,
        coverImageUrl,
        isPublished: !!isPublished,
        author: user.sub
    });
    return res.status(201).json({ ok: true, blog: doc });
});
exports.listBlogsPage = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const limit = 9;
    const totalCount = await blogModel_1.default.countDocuments({ isPublished: true });
    const totalPages = Math.max(1, Math.ceil(totalCount / limit));
    const currentPage = Math.min(Math.max(Number(req.query.page) || 1, 1), totalPages);
    const skip = (currentPage - 1) * limit;
    const blogs = await blogModel_1.default.find({ isPublished: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('author', 'name')
        .lean();
    const displayBlogs = blogs.map((b) => {
        const raw = typeof b.content === 'string' ? b.content : '';
        const plain = raw.replace(/<[^>]+>/g, '').trim();
        const excerpt = plain.length > 220 ? plain.slice(0, 220) + '…' : plain;
        return { ...b, excerpt };
    });
    res.render('blogs/index', { title: 'Blog Yazıları', blogs: displayBlogs, currentPage, totalPages });
});
exports.showBlogPage = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const blog = await blogModel_1.default.findById(req.params.id)
        .populate('author', 'name')
        .populate('categories', 'name')
        .lean();
    if (!blog)
        return res.status(404).render('errors/404', { title: '404 - Blog Yok' });
    res.render('blogs/show', { title: blog.title, blog });
});
exports.newBlogForm = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const categories = await categoriesModel_1.default.find({ isActive: true, kind: { $in: ['blog', 'both'] } })
        .sort({ name: 1 })
        .lean();
    res.render('blogs/new', { title: 'Yeni Blog Yazısı', categories });
});
// Yeni: düzenleme formu
exports.editBlogForm = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    if (!user)
        throw new authService_1.AppError(401, 'Yetkisiz: giriş yapın');
    const blog = await blogModel_1.default.findById(req.params.id);
    if (!blog) {
        return res.status(404).render('errors/404', { title: '404 - Blog Yok' });
    }
    const isOwner = String(blog.author) === String(user.sub);
    const isAdmin = Array.isArray(user.roles) && user.roles.includes('admin');
    if (!isOwner && !isAdmin)
        throw new authService_1.AppError(403, 'Bu yazıyı düzenleme yetkiniz yok');
    const categories = await categoriesModel_1.default.find({ isActive: true, kind: { $in: ['blog', 'both'] } })
        .sort({ name: 1 })
        .lean();
    return res.render('blogs/edit', { title: `Blogu Düzenle`, blog: blog.toObject(), categories });
});
// Yeni: blog güncelle
exports.updateBlog = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    if (!user)
        throw new authService_1.AppError(401, 'Yetkisiz: giriş yapın');
    const blog = await blogModel_1.default.findById(req.params.id);
    if (!blog)
        throw new authService_1.AppError(404, 'Blog bulunamadı');
    const isOwner = String(blog.author) === String(user.sub);
    const isAdmin = Array.isArray(user.roles) && user.roles.includes('admin');
    if (!isOwner && !isAdmin)
        throw new authService_1.AppError(403, 'Bu yazıyı güncelleme yetkiniz yok');
    const { title, content, tags, categories, coverImageUrl, isPublished } = req.body;
    if (!title?.trim() || !content?.trim()) {
        throw new authService_1.AppError(400, 'Başlık ve içerik zorunlu');
    }
    const normalizedCategories = Array.isArray(categories)
        ? categories.map((c) => String(c).trim()).filter(Boolean)
        : typeof categories === 'string' && categories.length
            ? categories.split(',').map((c) => c.trim()).filter(Boolean)
            : [];
    const normalizedTags = Array.isArray(tags)
        ? tags.map((t) => String(t).trim()).filter(Boolean)
        : typeof tags === 'string' && tags.length
            ? tags.split(',').map((t) => t.trim()).filter(Boolean)
            : [];
    blog.title = title.trim();
    blog.content = content;
    blog.coverImageUrl = coverImageUrl?.trim() || undefined;
    blog.tags = normalizedTags;
    blog.categories = normalizedCategories;
    blog.isPublished = !!isPublished;
    if (blog.isPublished && !blog.publishedAt)
        blog.publishedAt = new Date();
    if (!blog.isPublished)
        blog.publishedAt = undefined;
    await blog.save();
    return res.json({ ok: true, blog });
});
// Yeni: blog sil
exports.deleteBlog = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    if (!user)
        throw new authService_1.AppError(401, 'Yetkisiz: giriş yapın');
    const blog = await blogModel_1.default.findById(req.params.id);
    if (!blog)
        throw new authService_1.AppError(404, 'Blog bulunamadı');
    const isOwner = String(blog.author) === String(user.sub);
    const isAdmin = Array.isArray(user.roles) && user.roles.includes('admin');
    if (!isOwner && !isAdmin)
        throw new authService_1.AppError(403, 'Bu yazıyı silme yetkiniz yok');
    await blog.deleteOne();
    return res.json({ ok: true });
});
// Yeni: yayına al / yayından çek (isPublished + publishedAt)
exports.togglePublish = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    if (!user)
        throw new authService_1.AppError(401, 'Yetkisiz: giriş yapın');
    const blog = await blogModel_1.default.findById(req.params.id);
    if (!blog)
        throw new authService_1.AppError(404, 'Blog bulunamadı');
    const isOwner = String(blog.author) === String(user.sub);
    const isAdmin = Array.isArray(user.roles) && user.roles.includes('admin');
    if (!isOwner && !isAdmin)
        throw new authService_1.AppError(403, 'Bu yazıyı yayınlama yetkiniz yok');
    const { publish } = req.body;
    if (typeof publish !== 'boolean')
        throw new authService_1.AppError(400, 'publish alanı (true/false) gerekli');
    blog.isPublished = publish;
    if (publish) {
        blog.publishedAt = blog.publishedAt || new Date();
    }
    else {
        blog.publishedAt = undefined;
    }
    await blog.save();
    return res.json({ ok: true, isPublished: blog.isPublished, publishedAt: blog.publishedAt || null });
});
