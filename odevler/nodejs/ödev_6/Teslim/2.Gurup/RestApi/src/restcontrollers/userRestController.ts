import express from 'express'
import {deleteUser, getUserById, listUsersAll, login, logoutUser, register, updateUserRole} from '../services/userService'
import { IUser } from '../models/userModel'
import { verifyToken, checkRole, AuthRequest } from '../configs/auth'
import { eRoles } from '../utils/eRoles'
import { JwtPayload } from 'jsonwebtoken'
const userRestController = express.Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             name: "JohnnyLesh"
 *             email: "JohnnyLesh@example.com"
 *             password: "123456"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (yalnızca Admin)
 *     x-roles:
 *       - Admin
 *     x-validation-notes: |
 *       - name: required, min 3 chars, unique
 *       - password: required, min 8 chars, must include letters and numbers
 *       - email: required, must be valid email format
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "admin@example.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful (JWT döner)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *     x-validation-notes: |
 *       - email: required
 *       - password: required
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - password
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           example: "johndoe"
 *         password:
 *           type: string
 *           example: "StrongPassword123!"
 *         email:
 *           type: string
 *           example: "johndoe@example.com"
 *         roles:
 *           type: array
 *           items:
 *             type: string
 *             enum: ["Admin", "ProjectManager", "Developer"]
 *           description: Kullanıcı rolleri
 *         jwt:
 *           type: string
 *           description: Login sonrasında dönen JWT
 *     UserPublic:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         roles:
 *           type: array
 *           items:
 *             type: string
 *         date:
 *           type: string
 *           format: date-time
 *     ApiResponse:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *           example: 201
 *         message:
 *           type: string
 *           example: "Operation successful"
 *         data:
 *           type: object
 *           nullable: true
 *     LoginResponse:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *           example: 200
 *         message:
 *           type: string
 *           example: "Login successful"
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             roles:
 *               type: array
 *               items:
 *                 type: string
 *             jwt:
 *               type: string
 *               description: JWT token
 *     UsersListResponse:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *           example: 200
 *         message:
 *           type: string
 *           example: "Users listed successfully"
 *         data:
 *           type: object
 *           properties:
 *             users:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserPublic'
 *             page:
 *               type: integer
 *               example: 1
 *             limit:
 *               type: integer
 *               example: 10
 *             total:
 *               type: integer
 *               example: 42
 *             totalPages:
 *               type: integer
 *               example: 5
 *     RoleUpdateRequest:
 *       type: object
 *       required:
 *         - role
 *       properties:
 *         role:
 *           type: string
 *           enum: ["Admin", "ProjectManager", "Developer"]
 *           example: "ProjectManager"
 */

//kullanıcı kaydı sadece admin yapıldı (Ahmet)
userRestController.post('/register', verifyToken, checkRole(eRoles.Admin), async (req, res) => { 
    const user = req.body as IUser
    const jsonResult = await register(user)
    res.status(jsonResult.code).json(jsonResult)
})

userRestController.post('/login', async (req, res) => {
    const user = req.body as IUser
    const jsonResult = await login(user)
    res.status(jsonResult.code).json(jsonResult)
})

// Tüm kullanıcıları getir (sadece Admin)
/**
 * @swagger
 * /users/list:
 *   get:
 *     summary: List all users (Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Sayfa numarası
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Sayfa başına öğe sayısı
 *     responses:
 *       200:
 *         description: Users listed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsersListResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (yalnızca Admin)
 *     x-roles:
 *       - Admin
 */
userRestController.get('/list', verifyToken, checkRole(eRoles.Admin), async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await listUsersAll(page, limit);
    return res.status(result.code).json(result);
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error", error });
  }
})



/**
 * @swagger
 * /users/{id}/role:
 *   patch:
 *     summary: Update a user's role (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleUpdateRequest'
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       404:
 *         description: User not found
 */

//Kullanıcı rolünü güncelleme(Admin)
userRestController.patch('/:id/role', verifyToken, checkRole(eRoles.Admin), async (req, res) => {
  try {
    const { role } = req.body;
    const result = await updateUserRole(req.params.id, role);
    res.status(result.code).json(result);
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error", error });
  }
})


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID (Admin only)
 *     tags: [Users]
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
 *         description: User found
 *       404:
 *         description: User not found
 */

//Belirli bir Id'ye göre kullanıcı getirme(Admin)
userRestController.get('/:id', verifyToken, checkRole(eRoles.Admin), async (req, res) => {
  const result = await getUserById(req.params.id);
  res.status(result.code).json(result);
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID (Admin only)
 *     tags: [Users]
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
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */


//Kullanıcı silme(Admin)
userRestController.delete('/:id', verifyToken, checkRole(eRoles.Admin), async (req, res) => {
  const result = await deleteUser(req.params.id);
  res.status(result.code).json(result);
});

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Logout current user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 */

//Çıkış Yap 
userRestController.post('/logout',verifyToken, async(req:AuthRequest,res)=>{
  const userId = (req.user as JwtPayload)?.id;
  const result =await logoutUser(userId);
  res.status(result.code).json (result)
})

export default userRestController


