import { Request, Response, NextFunction } from "express";
import Post from "../models/Post.model";
import Comment from "../models/Comment.model";
import AppError from "../utils/AppError";

const isOwnerOrAdmin = (req: Request, postAuthorId: any) => {
  const userId = req.user!.userId;
  const role = req.user!.role;
  return role === "admin" || postAuthorId.toString() === userId;
};

// GET /api/v1/posts?page=1&limit=10&q=keyword
export const listPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Math.max(parseInt((req.query.page as string) || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt((req.query.limit as string) || "10", 10), 1), 50);
    const q = ((req.query.q as string) || "").trim();

    const filter: any = {};
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const [total, posts] = await Promise.all([
      Post.countDocuments(filter),
      Post.find(filter)
        .populate("author", "name email role")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        items: posts,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/v1/posts/:id
export const getPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name email role");
    if (!post) throw new AppError("Post bulunamadı", 404);

    const comments = await Comment.find({ post: post._id })
      .populate("author", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: { post, comments },
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/v1/posts
export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content } = req.body;

    if (!title || title.trim().length < 3) throw new AppError("Title min 3 karakter", 400);
    if (!content || content.trim().length < 10) throw new AppError("Content min 10 karakter", 400);

    const post = await Post.create({
      title: title.trim(),
      content: content.trim(),
      author: req.user!.userId,
    });

    return res.status(201).json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

// PUT /api/v1/posts/:id
export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) throw new AppError("Post bulunamadı", 404);

    if (!isOwnerOrAdmin(req, post.author)) throw new AppError("Forbidden", 403);

    const { title, content } = req.body;

    if (title !== undefined) {
      if (typeof title !== "string" || title.trim().length < 3) throw new AppError("Title min 3 karakter", 400);
      post.title = title.trim();
    }

    if (content !== undefined) {
      if (typeof content !== "string" || content.trim().length < 10) throw new AppError("Content min 10 karakter", 400);
      post.content = content.trim();
    }

    await post.save();

    return res.status(200).json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/v1/posts/:id
export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) throw new AppError("Post bulunamadı", 404);

    if (!isOwnerOrAdmin(req, post.author)) throw new AppError("Forbidden", 403);

    // Post silinince comment'ler de silinsin
    await Comment.deleteMany({ post: post._id });
    await post.deleteOne();

    return res.status(200).json({ success: true, data: { message: "Post silindi" } });
  } catch (err) {
    next(err);
  }
};
