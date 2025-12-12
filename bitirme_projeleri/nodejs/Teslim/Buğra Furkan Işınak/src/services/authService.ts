import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

export interface LoginResponse {
  user: Omit<IUser, 'password'>;
  token: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  bio?: string;
}

export class AuthService {
  private static generateToken(userId: string): string {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
  }

  static async register(data: RegisterData): Promise<LoginResponse> {
    try {
      logger.info('User registration attempt', { email: data.email });
      
      // Check if user already exists
      const existingUser = await User.findOne({ email: data.email });
      if (existingUser) {
        logger.warn('Registration failed: User already exists', { email: data.email });
        throw new AppError('User with this email already exists', 400);
      }

      // Create new user
      const user = new User({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        bio: data.bio
      });

      logger.database('create', 'users', { email: data.email, firstName: data.firstName, lastName: data.lastName });
      await user.save();

      // Generate token
      const token = this.generateToken(user._id.toString());

      // Return user without password
      const userResponse = user.toObject();
      delete userResponse.password;

      logger.auth('register', { userId: user._id, email: user.email });
      logger.info('User registration successful', { userId: user._id, email: user.email });

      return {
        user: userResponse,
        token
      };
    } catch (error) {
      logger.error('Registration failed', error);
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Registration failed', 500);
    }
  }

  static async login(email: string, password: string): Promise<LoginResponse> {
    try {
      // Find user and include password for comparison
      const user = await User.findOne({ email }).select('+password');
      
      if (!user || !user.isActive) {
        throw new AppError('Invalid credentials', 401);
      }

      // Check password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        throw new AppError('Invalid credentials', 401);
      }

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      // Generate token
      const token = this.generateToken(user._id.toString());

      // Return user without password
      const userResponse = user.toObject();
      delete userResponse.password;

      return {
        user: userResponse,
        token
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Login failed', 500);
    }
  }

  static async getProfile(userId: string): Promise<IUser> {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new AppError('User not found', 404);
      }
      return user;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to get profile', 500);
    }
  }

  static async updateProfile(userId: string, updateData: Partial<IUser>): Promise<IUser> {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true, runValidators: true }
      );

      if (!user) {
        throw new AppError('User not found', 404);
      }

      return user;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to update profile', 500);
    }
  }

  static async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    try {
      const user = await User.findById(userId).select('+password');
      if (!user) {
        throw new AppError('User not found', 404);
      }

      // Verify current password
      const isCurrentPasswordValid = await user.comparePassword(currentPassword);
      if (!isCurrentPasswordValid) {
        throw new AppError('Current password is incorrect', 400);
      }

      // Update password
      user.password = newPassword;
      await user.save();
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to change password', 500);
    }
  }

  static async deleteAccount(userId: string): Promise<void> {
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        throw new AppError('User not found', 404);
      }
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to delete account', 500);
    }
  }
}
