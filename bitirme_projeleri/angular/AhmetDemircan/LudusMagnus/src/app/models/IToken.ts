export interface IToken {
  id?: number;
  token: string;
  userId: string; // number'dan string'e değiştirildi
  expiresAt: string; // ISO date string
  createdAt: string; // ISO date string
}