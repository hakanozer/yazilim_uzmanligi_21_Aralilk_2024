import { Request, Response } from 'express';
import Blog from '../../models/blogModel';
import { DecodedToken } from '../authController';

function isOwnerOrAdmin(user: DecodedToken | undefined, author: any) {
  if (!user) return false;
  const isOwner = String(author) === String(user.sub);
  const isAdmin = Array.isArray(user.roles) ? user.roles.includes('admin') : user.roles === 'admin';
  return isOwner || isAdmin;
}

export async function listBlogs(_req: Request, res: Response) {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate('createdAt', 'title')
      .populate('content', 'tags')
      .lean();

    return res.json({ items: blogs });
  } catch {
    return res.status(500).json({ error: 'Bloglar listelenemedi' });
  }
}

export async function getBlog(req: Request, res: Response) {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'name email')
      .populate('categories', 'name')
      .lean();

    if (!blog) return res.status(404).json({ error: 'Blog bulunamadı' });
    return res.json({ item: blog });
  } catch {
    return res.status(400).json({ error: 'Geçersiz blog id' });
  }
}

// createBlog (REST)
export async function createBlog(req: Request, res: Response) {
  try {
    const user = (req as any).user as DecodedToken | undefined;
    if (!user) return res.status(401).json({ error: 'Yetkisiz: giriş yapın' });

    const { title, content, tags, categories, coverImageUrl, isPublished } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({ error: 'Başlık ve içerik zorunlu' });
    }

    const normalizedTags = Array.isArray(tags)
      ? tags.map((t) => String(t).trim()).filter(Boolean)
      : typeof tags === 'string' && tags.length
      ? tags.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    const normalizedCategories = Array.isArray(categories)
      ? categories.map((c) => String(c).trim()).filter(Boolean)
      : [];

    try {
      const doc = await Blog.create({
        title: title.trim(),
        content,
        tags: normalizedTags,
        categories: normalizedCategories,
        coverImageUrl,
        isPublished: !!isPublished,
        author: user.sub
      });
      return res.status(201).json({ ok: true, item: doc });
    } catch (err) {
      return res.status(400).json({ error: (err as Error).message });
    }
  } catch (err) {
    return res.status(400).json({ error: (err as Error).message });
  }
}

export async function updateBlog(req: Request, res: Response) {
  try {
    const user = (req as any).user as DecodedToken | undefined;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog bulunamadı' });

    const isAdmin = Array.isArray(user?.roles) ? user!.roles.includes('admin') : (user?.roles === 'admin');
    const owner = user && String(blog.author) === String(user.sub);
    if (!owner && !isAdmin) return res.status(403).json({ error: 'Yetkisiz' });

    // Admin sahibi değilse: yalnızca yayın durumunu değiştirebilir
    if (isAdmin && !owner) {
      const { isPublished } = req.body as { isPublished?: boolean };
      const forbiddenKeys = ['title', 'content', 'tags', 'categories', 'coverImageUrl'].filter(k => typeof (req.body as any)[k] !== 'undefined');
      if (forbiddenKeys.length) {
        return res.status(403).json({ error: 'Admin, sahibi olmadığı içeriğin başlık/içerik/görsel alanlarını değiştiremez' });
      }
      if (typeof isPublished !== 'boolean') {
        return res.status(400).json({ error: 'isPublished alanı boolean olmalı' });
      }
      blog.isPublished = isPublished;
      await blog.save();
      return res.json({ ok: true, item: blog });
    }

    const { title, content, tags, categories, coverImageUrl, isPublished } = req.body;
    blog.title = title ?? blog.title;
    blog.content = content ?? blog.content;
    blog.tags = tags ?? blog.tags;
    blog.categories = categories ?? blog.categories;
    blog.coverImageUrl = coverImageUrl ?? blog.coverImageUrl;
    blog.isPublished = typeof isPublished === 'boolean' ? isPublished : blog.isPublished;

    await blog.save();
    return res.json({ ok: true, item: blog });
  } catch (err) {
    return res.status(400).json({ error: (err as Error).message });
  }
}

export async function deleteBlog(req: Request, res: Response) {
  try {
    const user = (req as any).user as DecodedToken | undefined;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog bulunamadı' });
    if (!isOwnerOrAdmin(user, blog.author)) return res.status(403).json({ error: 'Yetkisiz' });

    await blog.deleteOne();
    return res.json({ ok: true });
  } catch (err) {
    return res.status(400).json({ error: (err as Error).message });
  }
}

export async function likeBlog(req: Request, res: Response) {
  try {
    const user = (req as any).user as DecodedToken | undefined;
    if (!user) return res.status(401).json({ error: 'Yetkisiz: giriş yapın' });

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog bulunamadı' });

    const userId = user.sub;
    const likesArray = Array.isArray((blog as any).likesID) ? (blog as any).likesID : [];
    const dislikesArray = Array.isArray((blog as any).dislikesID) ? (blog as any).dislikesID : [];

    const likedByUser = likesArray.some((id: any) => String(id) === String(userId));
    const dislikedByUser = dislikesArray.some((id: any) => String(id) === String(userId));

    let updated: any;
    let action: string;

    if (likedByUser) {
      updated = await Blog.findByIdAndUpdate(
        req.params.id,
        { $pull: { likesID: userId } },
        { new: true }
      ).lean();
      action = 'unliked';
    } else if (dislikedByUser) {
      updated = await Blog.findByIdAndUpdate(
        req.params.id,
        { $pull: { dislikesID: userId }, $addToSet: { likesID: userId } },
        { new: true }
      ).lean();
      action = 'switched_to_like';
    } else {
      updated = await Blog.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { likesID: userId } },
        { new: true }
      ).lean();
      action = 'liked';
    }

    return res.json({
      ok: true,
      action,
      likesCount: Array.isArray(updated?.likesID) ? updated!.likesID.length : 0,
      dislikesCount: Array.isArray(updated?.dislikesID) ? updated!.dislikesID.length : 0
    });
  } catch (err) {
    return res.status(400).json({ error: (err as Error).message });
  }
}

export async function dislikeBlog(req: Request, res: Response) {
  try {
    const user = (req as any).user as DecodedToken | undefined;
    if (!user) return res.status(401).json({ error: 'Yetkisiz: giriş yapın' });

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog bulunamadı' });

    const userId = user.sub;
    const likesArray = Array.isArray((blog as any).likesID) ? (blog as any).likesID : [];
    const dislikesArray = Array.isArray((blog as any).dislikesID) ? (blog as any).dislikesID : [];

    const likedByUser = likesArray.some((id: any) => String(id) === String(userId));
    const dislikedByUser = dislikesArray.some((id: any) => String(id) === String(userId));

    let updated: any;
    let action: string;

    if (dislikedByUser) {
      updated = await Blog.findByIdAndUpdate(
        req.params.id,
        { $pull: { dislikesID: userId } },
        { new: true }
      ).lean();
      action = 'undisliked';
    } else if (likedByUser) {
      updated = await Blog.findByIdAndUpdate(
        req.params.id,
        { $pull: { likesID: userId }, $addToSet: { dislikesID: userId } },
        { new: true }
      ).lean();
      action = 'switched_to_dislike';
    } else {
      updated = await Blog.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { dislikesID: userId } },
        { new: true }
      ).lean();
      action = 'disliked';
    }

    return res.json({
      ok: true,
      action,
      likesCount: Array.isArray(updated?.likesID) ? updated!.likesID.length : 0,
      dislikesCount: Array.isArray(updated?.dislikesID) ? updated!.dislikesID.length : 0
    });
  } catch (err) {
    return res.status(400).json({ error: (err as Error).message });
  }
}
