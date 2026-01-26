import jwt, { SignOptions } from "jsonwebtoken";

const getEnv = (key: string, fallback?: string) => {
  const val = process.env[key] ?? fallback;
  if (!val) throw new Error(`${key} is missing in .env`);
  return val;
};

export const signAccessToken = (payload: object) => {
  const secret = getEnv("JWT_SECRET");
  const expiresIn = getEnv("JWT_EXPIRES_IN", "15m") as SignOptions["expiresIn"];
  return jwt.sign(payload, secret, { expiresIn });
};

export const signRefreshToken = (payload: object) => {
  const secret = getEnv("JWT_REFRESH_SECRET");
  const expiresIn = getEnv("JWT_REFRESH_EXPIRES_IN", "7d") as SignOptions["expiresIn"];
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyAccessToken = (token: string) => {
  const secret = getEnv("JWT_SECRET");
  return jwt.verify(token, secret) as any;
};

export const verifyRefreshToken = (token: string) => {
  const secret = getEnv("JWT_REFRESH_SECRET");
  return jwt.verify(token, secret) as any;
};
