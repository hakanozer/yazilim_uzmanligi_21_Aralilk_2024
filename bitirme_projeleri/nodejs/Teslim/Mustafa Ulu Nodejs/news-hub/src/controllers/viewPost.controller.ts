import { Request, Response } from "express";
import Post from "../models/Post.model";
import Comment from "../models/Comment.model";
import { Types } from "mongoose";

function safeUser(sessionUser: any) {
  if (!sessionUser) return null;
  return {
    id: sessionUser.id,
    email: sessionUser.email,
    role: sessionUser.role,
    name: sessionUser.name,
  };
}

// Dashboard: kendi postlarını listele
export const viewMyPosts = async (req: Request, res: Response) => {
  const user = safeUser(req.session.user);
  if (!user) return res.redirect("/login");

  const posts = await Post.find({ author: user.id })
    .sort({ createdAt: -1 })
    .lean();

  return res.render("pages/dashboard", { user, posts });
};

// Yeni post formu
export const getNewPost = (req: Request, res: Response) => {
  const user = safeUser(req.session.user);
  if (!user) return res.redirect("/login");

  return res.render("posts/new", { user, error: null });
};

// Yeni post oluştur
export const postNewPost = async (req: Request, res: Response) => {
  try {
    const user = safeUser(req.session.user);
    if (!user) return res.redirect("/login");

    const { title, content } = req.body;

    if (!title || title.trim().length < 3) {
      return res.status(400).render("posts/new", { user, error: "Title en az 3 karakter olmalı" });
    }
    if (!content || content.trim().length < 10) {
      return res.status(400).render("posts/new", { user, error: "Content en az 10 karakter olmalı" });
    }

    const created = await Post.create({
      title: title.trim(),
      content: content.trim(),
      author: user.id,
    });

    return res.redirect(`/posts/${created._id.toString()}`);
  } catch (err) {
    console.error("EJS CREATE POST ERROR =>", err);
    return res.status(500).render("posts/new", {
      user: safeUser(req.session.user),
      error: "Server error",
    });
  }
};
console.log("RENDER => views/posts/detail.ejs");

// Post detay + yorumlar
export const viewPostDetail = async (req: Request, res: Response) => {
  const user = safeUser(req.session.user);
  const { id } = req.params;

  const post = await Post.findById(id)
    .populate("author", "name email role")
    .lean();

  if (!post) return res.status(404).render("errors/404", { user, title: "Not Found" });

  const comments = await Comment.find({ post: id })
    .populate("author", "name email role")
    .sort({ createdAt: -1 })
    .lean();

  const isAdmin = user?.role === "admin";
  const isOwner = (post as any).author?._id?.toString?.() === user?.id;

  // Admin veya owner ise true
  const canEdit = !!(isAdmin || isOwner);

  return res.render("posts/detail", {
    user,
    post,
    comments,
    isOwner,
    canEdit,
    error: null,
    title: (post as any).title || "Post Detail",
  });
};

// Yorum ekle
export const addComment = async (req: Request, res: Response) => {
  try {
    const user = safeUser(req.session.user);
    if (!user) return res.redirect("/login");

    const { id } = req.params; // postId
    const { content } = req.body;

    if (!content || content.trim().length < 2) {
      return res.redirect(`/posts/${id}`);
    }

    await Comment.create({
      post: id,
      author: user.id,
      content: content.trim(),
    });

    return res.redirect(`/posts/${id}`);
  } catch (err) {
    console.error("EJS ADD COMMENT ERROR =>", err);
    return res.redirect(`/posts/${req.params.id}`);
  }
};

// Post sil (sahibi veya admin)
export const deletePost = async (req: Request, res: Response) => {
  const user = safeUser(req.session.user);
  if (!user) return res.redirect("/login");

  const { id } = req.params;

  const post = await Post.findById(id).lean();
  if (!post) return res.redirect("/dashboard");

  const isAdmin = user.role === "admin";
  const isOwner = (post as any).author.toString() === user.id;

  if (!isAdmin && !isOwner) {
    return res.status(403).render("errors/403", { user });
  }

  await Comment.deleteMany({ post: id });
  await Post.findByIdAndDelete(id);

  return res.redirect("/dashboard");
};

// Yorum sil (admin || post sahibi || yorum sahibi)
export const deleteComment = async (req: Request, res: Response) => {
  const user = safeUser(req.session.user);
  if (!user) return res.redirect("/login");

  const { id: postId, commentId } = req.params;

  const post = await Post.findById(postId).lean();
  if (!post) return res.redirect("/dashboard");

  const comment = await Comment.findById(commentId).lean();
  if (!comment) return res.redirect(`/posts/${postId}`);

  const isAdmin = user.role === "admin";
  const isPostOwner = (post as any).author.toString() === user.id;
  const isCommentOwner = (comment as any).author.toString() === user.id;

  if (!isAdmin && !isPostOwner && !isCommentOwner) {
    return res.status(403).render("errors/403", { user });
  }

  await Comment.findByIdAndDelete(commentId);
  return res.redirect(`/posts/${postId}`);
};

// Edit formu aç (admin || owner)
export const getEditPost = async (req: Request, res: Response) => {
  const user = safeUser(req.session.user);
  if (!user) return res.redirect("/login");

  const { id } = req.params;

  const post = await Post.findById(id).lean();
  if (!post) return res.redirect("/dashboard");

  const isAdmin = user.role === "admin";
  const isOwner = (post as any).author.toString() === user.id;

  if (!isAdmin && !isOwner) {
    return res.status(403).render("errors/403", { user });
  }

  return res.render("posts/edit", { user, post, error: null });
};

// Edit submit (admin || owner)
export const postEditPost = async (req: Request, res: Response) => {
  try {
    const user = safeUser(req.session.user);
    if (!user) return res.redirect("/login");

    const { id } = req.params;
    const { title, content } = req.body;

    const post = await Post.findById(id).lean();
    if (!post) return res.redirect("/dashboard");

    const isAdmin = user.role === "admin";
    const isOwner = (post as any).author.toString() === user.id;

    if (!isAdmin && !isOwner) {
      return res.status(403).render("errors/403", { user });
    }

    if (!title || title.trim().length < 3) {
      return res.status(400).render("posts/edit", { user, post, error: "Title en az 3 karakter olmalı" });
    }
    if (!content || content.trim().length < 10) {
      return res.status(400).render("posts/edit", { user, post, error: "Content en az 10 karakter olmalı" });
    }

    await Post.findByIdAndUpdate(id, {
      title: title.trim(),
      content: content.trim(),
    });

    return res.redirect(`/posts/${id}`);
  } catch (err) {
    console.error("EJS EDIT POST ERROR =>", err);
    return res.redirect(`/posts/${req.params.id}`);
  }
};
