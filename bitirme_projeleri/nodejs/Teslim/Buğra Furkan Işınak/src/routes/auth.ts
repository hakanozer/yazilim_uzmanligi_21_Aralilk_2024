import express from 'express';
import { body } from 'express-validator';
import { AuthService } from '../services/authService';
import { authenticateToken } from '../middleware/auth';
import { validateRegister, validateLogin, validateProfileUpdate, validatePasswordChange } from '../middleware/validation';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: password123
 *               firstName:
 *                 type: string
 *                 example: Furkan
 *               lastName:
 *                 type: string
 *                 example: Işınak
 *               bio:
 *                 type: string
 *                 example: Kısa biyografi
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     token:
 *                       type: string
 *       400:
 *         description: Bad request
 *       409:
 *         description: User already exists
 */
router.post('/register', validateRegister, asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, bio } = req.body;
  
  const result = await AuthService.register({
    email,
    password,
    firstName,
    lastName,
    bio
  });

  res.status(201).json({
    status: 'success',
    message: 'User registered successfully',
    data: result
  });
}));

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', validateLogin, asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const result = await AuthService.login(email, password);

  res.status(200).json({
    status: 'success',
    message: 'Login successful',
    data: result
  });
}));

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
router.get('/profile', authenticateToken, asyncHandler(async (req, res) => {
  const user = await AuthService.getProfile(req.user!._id.toString());

  res.status(200).json({
    status: 'success',
    data: { user }
  });
}));

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
router.put('/profile', authenticateToken, validateProfileUpdate, asyncHandler(async (req, res) => {
  const updateData = req.body;
  const user = await AuthService.updateProfile(req.user!._id.toString(), updateData);

  res.status(200).json({
    status: 'success',
    message: 'Profile updated successfully',
    data: { user }
  });
}));

// @desc    Change password
// @route   POST /api/auth/change-password
// @access  Private
router.post('/change-password', authenticateToken, validatePasswordChange, asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  await AuthService.changePassword(
    req.user!._id.toString(),
    currentPassword,
    newPassword
  );

  res.status(200).json({
    status: 'success',
    message: 'Password changed successfully'
  });
}));

// @desc    Delete account
// @route   DELETE /api/auth/profile
// @access  Private
router.delete('/profile', authenticateToken, asyncHandler(async (req, res) => {
  await AuthService.deleteAccount(req.user!._id.toString());

  res.status(200).json({
    status: 'success',
    message: 'Account deleted successfully'
  });
}));

export default router;
