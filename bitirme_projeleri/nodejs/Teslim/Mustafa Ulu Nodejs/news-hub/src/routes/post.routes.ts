import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import { listPosts, getPost, createPost, updatePost, deletePost } from "../controllers/post.controller";
import { addCommentToPost } from "../controllers/comment.controller";


const router = Router();
/**
 * @openapi
 * tags:
 *   - name: Posts
 *     description: Post operations
 */

/**
 * @openapi
 * /api/v1/posts:
 *   get:
 *     summary: List posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/posts", listPosts);

/**
 * @openapi
 * /api/v1/posts/{id}:
 *   get:
 *     summary: Get post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 */
router.get("/posts/:id", getPost);

/**
 * @openapi
 * /api/v1/posts:
 *   post:
 *     summary: Create post (protected)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               content: { type: string }
 *             required: [title, content]
 *     responses:
 *       201:
 *         description: Created
 *       401:
 *         description: Unauthorized
 */
router.post("/posts", requireAuth, createPost);

/**
 * @openapi
 * /api/v1/posts/{id}:
 *   put:
 *     summary: Update post (protected)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               content: { type: string }
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 */
router.put("/posts/:id", requireAuth, updatePost);

/**
 * @openapi
 * /api/v1/posts/{id}:
 *   delete:
 *     summary: Delete post (protected)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 */
router.delete("/posts/:id", requireAuth, deletePost);

/**
 * @openapi
 * /api/v1/posts/{id}/comments:
 *   post:
 *     summary: Add comment to a post (protected)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text: { type: string }
 *             required: [text]
 *     responses:
 *       201:
 *         description: Created
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 */
router.post("/posts/:id/comments", requireAuth, addCommentToPost);


router.get("/posts", listPosts);
router.get("/posts/:id", getPost);
router.post("/posts", requireAuth, createPost);
router.put("/posts/:id", requireAuth, updatePost);
router.delete("/posts/:id", requireAuth, deletePost);
router.post("/posts/:id/comments", requireAuth, addCommentToPost);

export default router;
