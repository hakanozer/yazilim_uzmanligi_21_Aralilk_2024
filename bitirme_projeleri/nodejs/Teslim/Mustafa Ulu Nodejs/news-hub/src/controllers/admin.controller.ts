import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import Post from "../models/Post.model";
import AppError from "../utils/AppError";

export const adminOnly = (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "Welcome admin",
    user: req.user,
  });
};

// GET /api/v1/admin/users
export const listUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find().select("-passwordHash -refreshToken").sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/v1/admin/posts
export const listAllPosts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/v1/admin/users/:id/role
export const updateUserRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = req.body; // "admin" | "user"
    const userId = req.params.id;

    if (role !== "admin" && role !== "user") {
      throw new AppError("role sadece 'admin' veya 'user' olabilir", 400);
    }

    const user = await User.findById(userId);
    if (!user) throw new AppError("Kullanıcı bulunamadı", 404);

    user.role = role;
    await user.save();

    return res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};
