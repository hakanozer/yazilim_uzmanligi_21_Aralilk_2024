import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import {
  addCommentToPost,
  createComment,
  deleteComment,
  getComment,
  listComments,
  updateComment
} from "../controllers/comment.controller";

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Comments
 *     description: Comment operations
 */

/**
 * @openapi
 * /api/v1/comments:
 *   get:
 *     summary: List comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/comments", listComments);

/**
 * @openapi
 * /api/v1/comments/{id}:
 *   get:
 *     summary: Get comment by id
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 */
router.get("/comments/:id", getComment);

/**
 * @openapi
 * /api/v1/comments:
 *   post:
 *     summary: Create comment (by postId)
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [postId, content]
 *             properties:
 *               postId:
 *                 type: string
 *                 example: "697299c05ffddaac18208a13"
 *               content:
 *                 type: string
 *                 example: "Bu post çok iyi."
 *     responses:
 *       201:
 *         description: Created
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post Not Found
 */
router.post("/comments", requireAuth, createComment);

/**
 * @openapi
 * /api/v1/comments/{id}:
 *   put:
 *     summary: Update comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Yorumu güncelledim."
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not Found
 */
router.put("/comments/:id", requireAuth, updateComment);

/**
 * @openapi
 * /api/v1/comments/{id}:
 *   delete:
 *     summary: Delete comment (admin or post owner)
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not Found
 */
router.delete("/comments/:id", requireAuth, deleteComment);

/**
 * @openapi
 * /api/v1/posts/{id}/comments:
 *   post:
 *     summary: Add comment to a specific post (by post route param)
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Bu post'a yorum ekliyorum."
 *     responses:
 *       201:
 *         description: Created
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post Not Found
 */
router.post("/posts/:id/comments", requireAuth, addCommentToPost);

export default router;
