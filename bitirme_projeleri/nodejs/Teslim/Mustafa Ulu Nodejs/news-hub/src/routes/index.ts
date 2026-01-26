
import { Router } from "express";

import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import adminRoutes from "./admin.routes";
import viewRoutes from "./view.routes";
import postRoutes from "./post.routes";
import commentRoutes from "./comment.routes";

const router = Router();

// REST API routes (önce)
router.use("/api/v1/auth", authRoutes);
router.use("/api/v1", userRoutes);
router.use("/api/v1", adminRoutes);
router.use("/api/v1", postRoutes);
router.use("/api/v1", commentRoutes);

// EJS (View) routes (en sona)
router.use("/", viewRoutes);

export default router;
