import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: {
      sub: string;
      email: string;
      name: string;
      roles: string[];
    };
  }
}