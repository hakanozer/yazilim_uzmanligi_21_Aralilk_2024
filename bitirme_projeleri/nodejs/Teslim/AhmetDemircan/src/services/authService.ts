import User, { IUser } from '../models/userModel';
import { isValidEmail, isValidPassword } from '../utils/validators';
import { signToken } from '../controllers/authController';

export class AppError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function registerUser(input: { email?: string; password?: string; name?: string }): Promise<IUser> {
  const { email, password, name } = input;

  if (!email || !isValidEmail(email)) throw new AppError(400, 'Geçerli bir e-posta girin.');
  if (!password || !isValidPassword(password)) throw new AppError(400, 'Şifre en az 8 karakter olmalı.');

  const exists = await User.findOne({ email });
  if (exists) throw new AppError(409, 'Bu e-posta zaten kayıtlı.');

  const created = await User.create({ email, password, name, roles: ['user'] });
  return created;
}

export async function loginUser(input: { email?: string; password?: string }): Promise<{ user: IUser; token: string }> {
  const { email, password } = input;

  if (!email || !isValidEmail(email) || !password) throw new AppError(400, 'Geçerli bir e-posta ve şifre girin.');

  const user = await User.findOne({ email });
  const ok = user && (await user.comparePassword(password));
  if (!ok || !user) throw new AppError(401, 'E-posta veya şifre hatalı.');

  const token = signToken(user);
  return { user, token };
}