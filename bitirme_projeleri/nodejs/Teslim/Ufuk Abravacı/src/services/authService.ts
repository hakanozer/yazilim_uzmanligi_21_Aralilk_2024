import User, { IUser } from '../models/User';
import { generateToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';

export class AuthService {

  async register(userData: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }): Promise<{ user: IUser; token: string; refreshToken: string }> {
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Create new user
    const user = new User(userData);
    await user.save();

    // Generate tokens
    const userId = user._id.toString();
    const token = generateToken(userId);
    const refreshToken = generateRefreshToken(userId);

    return { user, token, refreshToken };
  }

  async login(credentials: {
    email: string;
    password: string;
  }): Promise<{ user: IUser; token: string; refreshToken: string }> {
    // Find user by email
    const user = await User.findOne({ email: credentials.email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check password
    const isPasswordValid = await user.comparePassword(credentials.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate tokens
    const userId = user._id.toString();
    const token = generateToken(userId);
    const refreshToken = generateRefreshToken(userId);

    return { user, token, refreshToken };
  }

  async getProfile(userId: string): Promise<IUser> {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async refreshToken(refreshToken: string): Promise<{ token: string; refreshToken: string }> {
    try {
      // Refresh token'ı verify et
      const decoded = verifyRefreshToken(refreshToken) as { id: string };
      // Kullanıcıyı bul
      const user = await User.findById(decoded.id);
      if (!user) {
        throw new Error('User not found');
      }
      const newToken = generateToken(user._id.toString());
      return { 
        token: newToken, 
        refreshToken
      };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}

export default new AuthService();