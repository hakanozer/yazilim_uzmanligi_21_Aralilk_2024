import "express-session";

declare module "express-session" {
  interface SessionData {
    user?: {
      id: string;
      email: string;
      role: "user" | "admin";
      name?: string;
    };
  }
}
