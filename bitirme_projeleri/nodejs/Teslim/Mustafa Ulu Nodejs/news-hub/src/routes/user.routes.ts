/**
 * @openapi
 * /api/v1/me:
 *   get:
 *     summary: Get current user (protected)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: OK }
 *       401: { description: Unauthorized }
 */


import { Router } from "express";
import { me } from "../controllers/user.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();

// Protected route
router.get("/me", requireAuth, me);

export default router;
