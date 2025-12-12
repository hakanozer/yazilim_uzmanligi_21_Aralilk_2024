import express from 'express';
import { User } from '../models/User';
import { Article } from '../models/Article';
import { authenticateToken, authorizeRoles, AuthRequest } from '../middleware/auth';
import { validateObjectId, validatePagination } from '../middleware/validation';
import { asyncHandler } from '../utils/asyncHandler';
import { uploadProfilePicture, deleteOldProfilePicture } from '../middleware/upload';

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (Public)
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of users per page
 *     responses:
 *       200:
 *         description: List of users
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
 *                     users:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *                     total:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get('/', validatePagination, asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find()
      .select('-password')
      .sort('-createdAt')
      .skip(skip)
      .limit(limit),
    User.countDocuments()
  ]);

  const pages = Math.ceil(total / limit);

  res.status(200).json({
    status: 'success',
    data: {
      users,
      pagination: {
        page,
        limit,
        total,
        pages
      }
    }
  });
}));

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
router.get('/:id', authenticateToken, validateObjectId('id'), asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found'
    });
  }

  res.status(200).json({
    status: 'success',
    data: { user }
  });
}));

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', authenticateToken, asyncHandler(async (req, res) => {
  const { firstName, lastName, bio } = req.body;
  
  const user = await User.findByIdAndUpdate(
    req.user!._id,
    { firstName, lastName, bio },
    { new: true, runValidators: true }
  ).select('-password');

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found'
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'Profile updated successfully',
    data: { user }
  });
}));

// @desc    Change user password
// @route   PUT /api/users/change-password
// @access  Private
router.put('/change-password', authenticateToken, asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  const user = await User.findById(req.user!._id);
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found'
    });
  }

  // Verify current password
  const isCurrentPasswordValid = await user.comparePassword(currentPassword);
  if (!isCurrentPasswordValid) {
    return res.status(400).json({
      status: 'error',
      message: 'Current password is incorrect'
    });
  }

  // Update password
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'Password changed successfully'
  });
}));

// @desc    Upload profile image
// @route   POST /api/users/profile-image
// @access  Private
router.post('/profile-image', authenticateToken, (req: AuthRequest, res) => {
  console.log('Profile image upload request received');
  console.log('User ID:', req.user?._id);
  console.log('Request body:', req.body);
  console.log('Request file:', req.file);
  

  deleteOldProfilePicture(req.user!._id.toString());
  uploadProfilePicture(req, res, async (err) => {
    console.log('Multer upload callback triggered');
    console.log('Error:', err);
    console.log('File:', req.file);
    
    if (err) {
      console.log('Multer error:', err.message);
      return res.status(400).json({
        status: 'error',
        message: err.message
      });
    }

    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({
        status: 'error',
        message: 'No file uploaded'
      });
    }

    try {
      // Delete old profile picture
      

      // Update user with new profile picture URL
      const profilePictureUrl = `/uploads/avatars/${req.file.filename}`;
      
      const user = await User.findByIdAndUpdate(
        req.user!._id,
        { profilePicture: profilePictureUrl },
        { new: true }
      ).select('-password');

      res.status(200).json({
        status: 'success',
        message: 'Profile image updated successfully',
        data: { profilePicture: profilePictureUrl }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to update profile image'
      });
    }
  });
});

// @desc    Get user's articles
// @route   GET /api/users/:id/articles
// @access  Public
router.get('/:id/articles', validateObjectId('id'), validatePagination, asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const [articles, total] = await Promise.all([
    Article.find({ 
      author: req.params.id,
      isPublished: true 
    })
      .populate('category', 'name color')
      .sort('-createdAt')
      .skip(skip)
      .limit(limit),
    Article.countDocuments({ 
      author: req.params.id,
      isPublished: true 
    })
  ]);

  const pages = Math.ceil(total / limit);

  res.status(200).json({
    status: 'success',
    data: {
      articles,
      pagination: {
        page,
        limit,
        total,
        pages
      }
    }
  });
}));

// @desc    Update user role (Admin only)
// @route   PUT /api/users/:id/role
// @access  Private (Admin only)
router.put('/:id/role', authenticateToken, authorizeRoles('admin'), validateObjectId('id'), asyncHandler(async (req, res) => {
  const { roles } = req.body;

  if (!Array.isArray(roles) || roles.length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Roles must be a non-empty array'
    });
  }

  const validRoles = ['user', 'author', 'admin'];
  const invalidRoles = roles.filter(role => !validRoles.includes(role));

  if (invalidRoles.length > 0) {
    return res.status(400).json({
      status: 'error',
      message: `Invalid roles: ${invalidRoles.join(', ')}`
    });
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { roles },
    { new: true, runValidators: true }
  ).select('-password');

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found'
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'User role updated successfully',
    data: { user }
  });
}));

// @desc    Toggle user active status (Admin only)
// @route   PUT /api/users/:id/status
// @access  Private (Admin only)
router.put('/:id/status', authenticateToken, authorizeRoles('admin'), validateObjectId('id'), asyncHandler(async (req, res) => {
  const { isActive } = req.body;

  if (typeof isActive !== 'boolean') {
    return res.status(400).json({
      status: 'error',
      message: 'isActive must be a boolean value'
    });
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isActive },
    { new: true, runValidators: true }
  ).select('-password');

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found'
    });
  }

  res.status(200).json({
    status: 'success',
    message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
    data: { user }
  });
}));

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private (Admin only)
router.delete('/:id', authenticateToken, authorizeRoles('admin'), validateObjectId('id'), asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found'
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully'
  });
}));

export default router;
