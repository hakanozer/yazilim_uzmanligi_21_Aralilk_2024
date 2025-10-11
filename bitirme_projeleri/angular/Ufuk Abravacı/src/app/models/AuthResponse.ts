import { PublicUser } from "./User";

export interface AuthResponse {
  accessToken: string;
  user: PublicUser; //response passwordsüz olacağı için publicuser
}