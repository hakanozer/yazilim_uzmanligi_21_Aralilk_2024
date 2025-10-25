import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { isValidEmail, isValidPassword } from '../utils/validators';

export type UserRole = 'user' |'author'| 'admin';

export interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  profilePicture?: string;
  roles: UserRole[];
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true, // unique zaten indeks oluşturur
    lowercase: true,
    trim: true,
    validate: { validator: isValidEmail, message: 'Geçerli bir e-posta girin' }
  },
  password: {
    type: String,
    required: true,
    validate: { validator: isValidPassword, message: 'Şifre en az 8 karakter olmalı' }
  },
  name: { type: String, trim: true },
  profilePicture: { type: String, default: '/images/default-avatar.svg' },
  roles: { type: [String], enum: ['user', 'admin','author'], default: ['user'], required: true }
}, { timestamps: true });

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err as Error);
  }
});

userSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.path('createdAt').immutable(true);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
