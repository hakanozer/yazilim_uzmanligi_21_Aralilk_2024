import { Request, Response, NextFunction } from "express";
import Comment from "../models/Comment.model";
import Post from "../models/Post.model";
import AppError from "../utils/AppError";

/**
 * POST /api/v1/posts/:id/comments
 * Post'a yorum ekle (protected)
 */
export const addCommentToPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content } = req.body;

    if (!content || typeof content !== "string" || content.trim().length < 1) {
      throw new AppError("Comment content zorunlu", 400);
    }

    const post = await Post.findById(req.params.id);
    if (!post) throw new AppError("Post bulunamadı", 404);

    const comment = await Comment.create({
      post: post._id,
      author: req.user!.userId,
      content: content.trim(),
    });

    return res.status(201).json({ success: true, data: comment });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/v1/comments/:id
 * Kural: Admin silebilir, Post sahibi silebilir (istersen comment sahibi de ekleriz)
 */
export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) throw new AppError("Yorum bulunamadı", 404);

    const post = await Post.findById(comment.post);
    if (!post) throw new AppError("Post bulunamadı", 404);

    const userId = req.user!.userId;
    const role = req.user!.role;

    const canDelete = role === "admin" || post.author.toString() === userId;
    if (!canDelete) throw new AppError("Forbidden", 403);

    await comment.deleteOne();

    return res.status(200).json({ success: true, data: { message: "Yorum silindi" } });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/v1/comments
 * Tüm yorumları listele
 */
export const listComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const comments = await Comment.find()
      .populate("author", "name email role")
      .populate("post", "title")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: comments });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/v1/comments/:id
 * Tek yorumu getir
 */
export const getComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate("author", "name email role")
      .populate("post", "title");

    if (!comment) throw new AppError("Yorum bulunamadı", 404);

    return res.status(200).json({ success: true, data: comment });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/v1/comments
 * body: { postId, content }
 * Comment oluştur (protected)
 */
export const createComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId, content } = req.body;

    if (!postId) throw new AppError("postId zorunlu", 400);
    if (!content || typeof content !== "string" || content.trim().length < 1) {
      throw new AppError("content zorunlu", 400);
    }

    const post = await Post.findById(postId);
    if (!post) throw new AppError("Post bulunamadı", 404);

    const comment = await Comment.create({
      post: post._id,
      author: req.user!.userId,
      content: content.trim(),
    });

    return res.status(201).json({ success: true, data: comment });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/v1/comments/:id
 * body: { content }
 * Comment güncelle (protected)
 * Kural: Admin güncelleyebilir, comment sahibi güncelleyebilir
 */
export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content } = req.body;

    if (!content || typeof content !== "string" || content.trim().length < 1) {
      throw new AppError("content zorunlu", 400);
    }

    const comment = await Comment.findById(req.params.id);
    if (!comment) throw new AppError("Yorum bulunamadı", 404);

    const userId = req.user!.userId;
    const role = req.user!.role;

    const canUpdate = role === "admin" || comment.author.toString() === userId;
    if (!canUpdate) throw new AppError("Forbidden", 403);

    comment.content = content.trim();
    await comment.save();

    return res.status(200).json({ success: true, data: comment });
  } catch (err) {
    next(err);
  }
};
