import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";
import { adminOnly, listUsers, listAllPosts, updateUserRole } from "../controllers/admin.controller";

const router = Router();

/**
 * @openapi
 * /api/v1/admin:
 *   get:
 *     summary: Admin only endpoint
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: OK }
 *       401: { description: Unauthorized }
 *       403: { description: Forbidden }
 */
router.get("/admin", requireAuth, requireRole(["admin"]), adminOnly);

/**
 * @openapi
 * /api/v1/admin/users:
 *   get:
 *     summary: List all users (admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: OK }
 *       401: { description: Unauthorized }
 *       403: { description: Forbidden }
 */
router.get("/admin/users", requireAuth, requireRole(["admin"]), listUsers);

/**
 * @openapi
 * /api/v1/admin/posts:
 *   get:
 *     summary: List all posts (admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: OK }
 *       401: { description: Unauthorized }
 *       403: { description: Forbidden }
 */
router.get("/admin/posts", requireAuth, requireRole(["admin"]), listAllPosts);

/**
 * @openapi
 * /api/v1/admin/users/{id}/role:
 *   patch:
 *     summary: Update user role (admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200: { description: OK }
 *       400: { description: Bad Request }
 *       401: { description: Unauthorized }
 *       403: { description: Forbidden }
 *       404: { description: Not Found }
 */
router.patch("/admin/users/:id/role", requireAuth, requireRole(["admin"]), updateUserRole);

export default router;
