// {
//   "name": "Admin User",
//   "email": "admin@teamtask.com",
//   "password": "admin123",
//   "roles": ["Admin"]
// }
//admin jwt
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZWE2MTgyYmIwZTcwNGIxNGIzZjY1NCIsImVtYWlsIjoiYWRtaW5AdGVhbXRhc2suY29tIiwicm9sZXMiOlsiQWRtaW4iXSwiaWF0IjoxNzYwMTkwODg3LCJleHAiOjE3NjAxOTQ0ODd9.udhaJBbCGH_mgdhQvKrPRmu-eKMEVR3blcWJ7GYQBrc

import { Request, Response, Router } from "express";
import { registerUser, loginUser } from "../services/authService";
import { verifyToken, checkRole, AuthenticatedRequest } from "../middlewares/auth.middleware";
import { eRoles } from "../utils/eRoles";

const authController = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register new user
 *     description: Create a new user account (Open registration)
 *     requestBody:
 *       required: true
 *       content:
 *         "application/json":
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [Admin, ProjectManager, Developer]
 *                 example: ["Developer"]
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           "application/json":
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
authController.post("/register", async (req: Request, res: Response) => {
  const result = await registerUser(req.body);
  res.status(result.code).json(result);
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: User login
 *     description: Authenticate user and return JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         "application/json":
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           "application/json":
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 */
authController.post("/login", async (req: Request, res: Response) => {
  console.log('🔐 Login endpoint called'); // DEBUG
  const result = await loginUser(req.body);
  res.status(result.code).json(result);
});

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     tags: [Auth]
 *     summary: Verify JWT token
 *     description: Verify if the JWT token is valid and get basic user info from token
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *         content:
 *           "application/json":
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized - Token required or invalid
 *       403:
 *         description: Forbidden - Token expired or invalid
 */
authController.get("/profile", verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Token is valid",
    data: { user: req.user }
  });
});

export default authController;