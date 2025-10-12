import express from 'express'
import { getAllUsers, login, register, updateUserRole } from '../services/userServices'
import { IUser } from '../models/userModel'
import { verify } from 'crypto'
import { requireAdmin, verifyToken } from '../middlewares/authMiddleware'

const userRestController = express.Router()

// Swagger Documentation
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
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: 'caglar@mail.com'
 *               password: 
 *                 type: string
 *                 format: password
 *                 example: '123456'
 *     responses:
 *       200:
 *         description: Login successful
 *       404:
 *         description: E-mail or Password is incorrect
 */

/**
 * @swagger
 * /users/list:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:   
 *         description: User list retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /users/role/{id}:
 *   put:
 *     summary: Update user roles (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roles
 *             properties:
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["admin", "user"]
 *     responses:
 *       200:
 *         description: User roles updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

// User Register
userRestController.post('/register', async (req,res) => {
    const user = req.body as IUser
    const dataResult = await register(user)
    res.status(dataResult.code).json(dataResult)
})
   
// User Login
userRestController.post('/login', async (req, res) => {
    const user = req.body as IUser
    const jsonResult = await login(user)
    res.status(jsonResult.code).json(jsonResult)
})

// User listesi (admin)
userRestController.get('/list', verifyToken, requireAdmin, async (req: express.Request & { user?: IUser }, res) => {
    const authUser = req.user as IUser
    const jsonResult = await getAllUsers(authUser)
    res.status(jsonResult.code).json(jsonResult)
})

// Role update (admin)
userRestController.put('/role/:id', verifyToken, requireAdmin, async (req: express.Request & { user?: IUser }, res) => {
    try {
    const { id } = req.params
    const { roles } = req.body
    const jsonResult = await updateUserRole(id, roles)
    res.status(jsonResult.code).json(jsonResult)
}catch (error) {
        return res.status(500).json({
            code: 500,
            status: false,
            message: 'Sunucu hatası',
            error: error
        });
    }
});

export default userRestController