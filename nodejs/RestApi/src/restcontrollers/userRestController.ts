import express from 'express'
import {login, register} from '../services/userService'
import { IUser } from '../models/userModel'
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
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             name: "johndoe"
 *             email: "johndoe@example.com"
 *             password: "StrongPassword123!"
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
 *     x-validation-notes: |
 *       - name: required, min 3 chars, unique
 *       - password: required, min 8 chars, must include letters and numbers
 *       - email: required, must be valid email format
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login with username and password
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
 *                 example: "zehra@mail.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
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
 *         - username
 *         - password
 *         - email
 *       properties:
 *         username:
 *           type: string
 *           example: "johndoe"
 *         password:
 *           type: string
 *           example: "StrongPassword123!"
 *         email:
 *           type: string
 *           example: "johndoe@example.com"
 *     ApiResponse:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *           example: 201
 *         message:
 *           type: string
 *           example: "User registered successfully"
 *         data:
 *           type: object
 *           nullable: true
 */
userRestController.post('/register', async (req, res) => {
    const user = req.body as IUser
    const jsonResult = await register(user)
    res.status(jsonResult.code).json(jsonResult)
})

userRestController.post('/login', async (req, res) => {
    const user = req.body as IUser
    const jsonResult = await login(user)
    res.status(jsonResult.code).json(jsonResult)
})

export default userRestController
