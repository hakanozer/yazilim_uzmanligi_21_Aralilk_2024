import { Request, Response } from "express";
import { User } from "../models/User";
import Post from "../models/Post.model";

function safeUser(sessionUser: any) {
  if (!sessionUser) return null;
  return {
    id: sessionUser.id,
    email: sessionUser.email,
    role: sessionUser.role,
    name: sessionUser.name,
  };
}

export const viewAdmin = async (req: Request, res: Response) => {
  const user = safeUser(req.session.user);

  // ekstra güvenlik
  if (!user || user.role !== "admin") {
    return res.status(403).render("errors/403", { user });
  }

  const users = await User.find().sort({ createdAt: -1 }).lean();
  const posts = await Post.find()
    .populate("author", "name email role")
    .sort({ createdAt: -1 })
    .lean();

  return res.render("pages/admin", { user, users, posts });
};
