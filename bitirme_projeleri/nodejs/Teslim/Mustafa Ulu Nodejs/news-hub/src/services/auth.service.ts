import bcrypt from "bcrypt";
import { User } from "../models/User";
import AppError from "../utils/AppError";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt";

export const registerService = async (body: { name: string; email: string; password: string }) => {
  const { name, email, password } = body;

  const exists = await User.findOne({ email });
  if (exists) throw new AppError("Bu email zaten kayıtlı", 400);

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    passwordHash,
    role: "user",
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

export const loginService = async (body: { email: string; password: string }) => {
  const { email, password } = body;

  const user = await User.findOne({ email });
  if (!user) throw new AppError("Email veya şifre hatalı", 401);

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new AppError("Email veya şifre hatalı", 401);

  // requireAuth middleware'in beklediği payload: { userId, role }
  const accessToken = signAccessToken({ userId: user._id.toString(), role: user.role });
  const refreshToken = signRefreshToken({ userId: user._id.toString() });

  user.refreshToken = refreshToken;
  await user.save();

  return {
    accessToken,
    refreshToken,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
};

export const refreshService = async (body: { refreshToken: string }) => {
  const { refreshToken } = body;
  if (!refreshToken) throw new AppError("refreshToken zorunlu", 400);

  let decoded: any;
  try {
    decoded = verifyRefreshToken(refreshToken); // { userId, iat, exp }
  } catch {
    throw new AppError("Refresh token geçersiz veya süresi dolmuş", 401);
  }

  const user = await User.findById(decoded.userId);
  if (!user) throw new AppError("Kullanıcı bulunamadı", 401);

  if (!user.refreshToken || user.refreshToken !== refreshToken) {
    throw new AppError("Refresh token artık geçerli değil", 401);
  }

  const newAccessToken = signAccessToken({ userId: user._id.toString(), role: user.role });

  return { accessToken: newAccessToken };
};

export const logoutService = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError("Kullanıcı bulunamadı", 401);

  user.refreshToken = null;
  await user.save();

  return { message: "Çıkış yapıldı" };
};
// =========================
// EJS (Session) compatibility
// viewAuth.controller.ts bunları çağırıyor:
//   loginUser(email, password)
//   registerUser(name, email, password)
// =========================

export const loginUser = async (email: string, password: string) => {
  // mevcut API servisini kullanıyoruz
  const result = await loginService({ email, password });

  // EJS controller u = result.user yakalıyor, bu yüzden user'ı garanti ediyoruz
  return {
    user: result.user,
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
  };
};

export const registerUser = async (name: string, email: string, password: string) => {
  const user = await registerService({ name, email, password });

  // EJS register sonrası direkt session'a basıyor: u.email, u.role, u.name...
  // user zaten {id,name,email,role} dönüyor; onu aynı formatta gönderiyoruz
  return {
    user: {
      id: (user as any).id,
      name: (user as any).name,
      email: (user as any).email,
      role: (user as any).role,
    },
  };
};
