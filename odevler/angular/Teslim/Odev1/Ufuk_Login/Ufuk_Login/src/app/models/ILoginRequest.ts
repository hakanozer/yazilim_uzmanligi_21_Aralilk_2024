export interface ILoginRequest {
  username: string;
  password: string;
  expiresInMins?: number;
}