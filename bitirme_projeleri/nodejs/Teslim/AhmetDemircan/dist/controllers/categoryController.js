"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCategoriesPage = listCategoriesPage;
exports.newCategoryForm = newCategoryForm;
exports.createCategoryWeb = createCategoryWeb;
const categoriesModel_1 = __importDefault(require("../models/categoriesModel"));
async function listCategoriesPage(_req, res) {
    const items = await categoriesModel_1.default.find().sort({ name: 1 }).lean();
    res.render('categories/index', { title: 'Kategoriler', categories: items });
}
async function newCategoryForm(req, res) {
    const user = req.user;
    const userRoles = Array.isArray(user?.roles) ? user.roles : user?.roles ? [user.roles] : [];
    if (!user || !userRoles.includes('admin')) {
        return res.status(403).render('errors/403', { title: '403 - Yetkisiz' });
    }
    res.render('categories/new', { title: 'Yeni Kategori', errors: [], values: {} });
}
async function createCategoryWeb(req, res) {
    const user = req.user;
    const userRoles = Array.isArray(user?.roles) ? user.roles : user?.roles ? [user.roles] : [];
    if (!user || !userRoles.includes('admin')) {
        return res.status(403).render('errors/403', { title: '403 - Yetkisiz' });
    }
    const { name, description, kind, isActive } = req.body;
    const values = { name, description, kind, isActive };
    const errors = [];
    if (!name?.trim())
        errors.push('Kategori adı zorunlu');
    if (errors.length) {
        return res.status(400).render('categories/new', { title: 'Yeni Kategori', errors, values });
    }
    try {
        await categoriesModel_1.default.create({
            name: name.trim(),
            description: description?.trim() || undefined,
            kind: kind || 'both',
            isActive: typeof isActive === 'boolean' ? isActive : String(isActive) === 'on'
        });
        return res.redirect('/categories');
    }
    catch (err) {
        const msg = err && err.code === 11000 ? 'Bu kategori adı zaten kayıtlı' : err.message;
        return res.status(400).render('categories/new', { title: 'Yeni Kategori', errors: [msg], values });
    }
}
