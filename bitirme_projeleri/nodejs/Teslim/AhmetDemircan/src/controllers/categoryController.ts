import { Request, Response } from 'express';
import Category from '../models/categoriesModel';
import { DecodedToken } from './authController';

export async function listCategoriesPage(_req: Request, res: Response) {
  const items = await Category.find().sort({ name: 1 }).lean();
  res.render('categories/index', { title: 'Kategoriler', categories: items });
}

export async function newCategoryForm(req: Request, res: Response) {
  const user = (req as any).user as DecodedToken | undefined;
  const userRoles = Array.isArray(user?.roles) ? user!.roles : user?.roles ? [user.roles] : [];
  if (!user || !userRoles.includes('admin')) {
    return res.status(403).render('errors/403', { title: '403 - Yetkisiz' });
  }
  res.render('categories/new', { title: 'Yeni Kategori', errors: [], values: {} });
}

export async function createCategoryWeb(req: Request, res: Response) {
  const user = (req as any).user as DecodedToken | undefined;
  const userRoles = Array.isArray(user?.roles) ? user!.roles : user?.roles ? [user.roles] : [];
  if (!user || !userRoles.includes('admin')) {
    return res.status(403).render('errors/403', { title: '403 - Yetkisiz' });
  }

  const { name, description, kind, isActive } = req.body as {
    name?: string; description?: string; kind?: 'news'|'blog'|'both'; isActive?: string | boolean;
  };
  const values = { name, description, kind, isActive };

  const errors: string[] = [];
  if (!name?.trim()) errors.push('Kategori adı zorunlu');
  if (errors.length) {
    return res.status(400).render('categories/new', { title: 'Yeni Kategori', errors, values });
  }

  try {
    await Category.create({
      name: name!.trim(),
      description: description?.trim() || undefined,
      kind: kind || 'both',
      isActive: typeof isActive === 'boolean' ? isActive : String(isActive) === 'on'
    });
    return res.redirect('/categories');
  } catch (err: any) {
    const msg = err && err.code === 11000 ? 'Bu kategori adı zaten kayıtlı' : (err as Error).message;
    return res.status(400).render('categories/new', { title: 'Yeni Kategori', errors: [msg], values });
  }
}