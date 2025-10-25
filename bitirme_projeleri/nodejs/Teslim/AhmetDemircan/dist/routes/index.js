"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogModel_1 = __importDefault(require("../models/blogModel"));
const newsModel_1 = __importDefault(require("../models/newsModel"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const [news, blogs] = await Promise.all([
            newsModel_1.default.find({ isActive: true })
                .sort({ createdAt: -1 })
                .populate('category', 'name')
                .populate('author', 'name')
                .lean(),
            blogModel_1.default.find({ isPublished: true })
                .sort({ createdAt: -1 })
                .populate('author', 'name')
                .lean(),
        ]);
        res.render('index', { title: 'Yggdrasil', news, blogs });
    }
    catch (err) {
        res.render('index', { title: 'Yggdrasil', news: [], blogs: [] });
    }
});
exports.default = router;
