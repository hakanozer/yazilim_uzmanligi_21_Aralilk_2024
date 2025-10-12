import { Request, Response, Router } from "express";
import { getUsers, updateUserRoles, getUserById } from "../services/userService";
import { verifyToken, checkRole } from "../middlewares/auth.middleware";
import { eRoles } from "../utils/eRoles";

const userManagementController = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [User Management]
 *     summary: Get all users (Admin only)
 *     description: Retrieve all users from the system. Only accessible by Admin.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           "application/json":
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized - Token required
 *       403:
 *         description: Forbidden - Admin role required
 *       500:
 *         description: Internal server error
 */
userManagementController.get("/", verifyToken, checkRole(eRoles.Admin), async (req: Request, res: Response) => {
  const result = await getUsers();
  res.status(result.code).json(result);
});

/**
 * @swagger
 * /users/{id}/role:
 *   patch:
 *     tags: [User Management]
 *     summary: Update user roles (Admin only)
 *     description: Update user roles. Only accessible by Admin.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         "application/json":
 *           schema:
 *             type: object
 *             required:
 *               - roles
 *             properties:
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [Admin, ProjectManager, Developer]
 *                 example: ["ProjectManager", "Developer"]
 *                 description: New roles for the user
 *     responses:
 *       200:
 *         description: User roles updated successfully
 *         content:
 *           "application/json":
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Bad request - Invalid roles or validation error
 *       401:
 *         description: Unauthorized - Token required
 *       403:
 *         description: Forbidden - Admin role required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userManagementController.patch("/:id/role", verifyToken, checkRole(eRoles.Admin), 
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { roles } = req.body;
    const result = await updateUserRoles(id, roles);
    res.status(result.code).json(result);
  }
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [User Management]
 *     summary: Get user by ID (Admin only)
 *     description: Retrieve a specific user by ID. Only accessible by Admin.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           "application/json":
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized - Token required
 *       403:
 *         description: Forbidden - Admin role required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userManagementController.get("/:id", verifyToken, checkRole(eRoles.Admin), async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getUserById(id);
  res.status(result.code).json(result);
});

export default userManagementController;