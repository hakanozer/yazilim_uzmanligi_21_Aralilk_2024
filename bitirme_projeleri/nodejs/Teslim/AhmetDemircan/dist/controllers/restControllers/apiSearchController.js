"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchBlogs = searchBlogs;
exports.searchNews = searchNews;
const blogModel_1 = __importDefault(require("../../models/blogModel"));
const newsModel_1 = __importDefault(require("../../models/newsModel"));
const searchController_1 = require("../searchController");
// Blog araması
async function searchBlogs(req, res) {
    try {
        const q = (0, searchController_1.getQueryFromReq)(req);
        console.log('[searchBlogs] q=', q); // geçici log: veri akışını doğrulama
        if (!q)
            return res.json({ items: [] });
        const limit = (0, searchController_1.normalizeLimit)(req.query.limit);
        const items = await blogModel_1.default.find((0, searchController_1.makeBlogSearchFilter)(q))
            .sort({ createdAt: -1 })
            .limit(limit)
            .select('title coverImageUrl createdAt author')
            .populate('author', 'name')
            .lean();
        return res.json({ items });
    }
    catch {
        return res.status(500).json({ error: 'Arama sırasında hata oluştu' });
    }
}
// Yeni: News araması
async function searchNews(req, res) {
    try {
        const q = (0, searchController_1.getQueryFromReq)(req);
        if (!q)
            return res.json({ items: [] });
        const limit = (0, searchController_1.normalizeLimit)(req.query.limit);
        const items = await newsModel_1.default.find((0, searchController_1.makeNewsSearchFilter)(q))
            .sort({ createdAt: -1 })
            .limit(limit)
            .select('title imageUrl createdAt author')
            .populate('author', 'name')
            .lean();
        return res.json({ items });
    }
    catch {
        return res.status(500).json({ error: 'Arama sırasında hata oluştu' });
    }
}
