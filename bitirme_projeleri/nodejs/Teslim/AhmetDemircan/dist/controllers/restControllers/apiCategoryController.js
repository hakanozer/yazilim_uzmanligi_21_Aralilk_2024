"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCategories = listCategories;
exports.getCategory = getCategory;
exports.createCategory = createCategory;
const categoriesModel_1 = __importDefault(require("../../models/categoriesModel"));
async function listCategories(_req, res) {
    try {
        const items = await categoriesModel_1.default.find().sort({ name: 1 }).lean();
        return res.json({ items });
    }
    catch {
        return res.status(500).json({ error: 'Kategoriler listelenemedi' });
    }
}
async function getCategory(req, res) {
    try {
        const item = await categoriesModel_1.default.findById(req.params.id).lean();
        if (!item)
            return res.status(404).json({ error: 'Kategori bulunamadı' });
        return res.json({ item });
    }
    catch {
        return res.status(400).json({ error: 'Geçersiz kategori id' });
    }
}
async function createCategory(req, res) {
    try {
        const { name, description, kind, isActive } = req.body;
        if (!name?.trim()) {
            return res.status(400).json({ error: 'Kategori adı zorunlu' });
        }
        const doc = await categoriesModel_1.default.create({
            name: name.trim(),
            description: description?.trim() || undefined,
            kind: kind || 'both',
            isActive: typeof isActive === 'boolean' ? isActive : true
        });
        return res.status(201).json({ ok: true, item: doc });
    }
    catch (err) {
        // Mongo duplicate key
        if (err && err.code === 11000) {
            return res.status(409).json({ error: 'Bu kategori adı zaten kayıtlı' });
        }
        return res.status(400).json({ error: err.message });
    }
}
