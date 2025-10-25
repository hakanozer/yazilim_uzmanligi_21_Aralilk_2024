import { Request, Response } from 'express';
import Category from '../../models/categoriesModel';

export async function listCategories(_req: Request, res: Response) {
  try {
    const items = await Category.find().sort({ name: 1 }).lean();
    return res.json({ items });
  } catch {
    return res.status(500).json({ error: 'Kategoriler listelenemedi' });
  }
}

export async function getCategory(req: Request, res: Response) {
  try {
    const item = await Category.findById(req.params.id).lean();
    if (!item) return res.status(404).json({ error: 'Kategori bulunamadı' });
    return res.json({ item });
  } catch {
    return res.status(400).json({ error: 'Geçersiz kategori id' });
  }
}

export async function createCategory(req: Request, res: Response) {
  try {
    const { name, description, kind, isActive } = req.body;
    if (!name?.trim()) {
      return res.status(400).json({ error: 'Kategori adı zorunlu' });
    }

    const doc = await Category.create({
      name: name.trim(),
      description: description?.trim() || undefined,
      kind: kind || 'both',
      isActive: typeof isActive === 'boolean' ? isActive : true
    });

    return res.status(201).json({ ok: true, item: doc });
  } catch (err: any) {
    // Mongo duplicate key
    if (err && err.code === 11000) {
      return res.status(409).json({ error: 'Bu kategori adı zaten kayıtlı' });
    }
    return res.status(400).json({ error: (err as Error).message });
  }
}