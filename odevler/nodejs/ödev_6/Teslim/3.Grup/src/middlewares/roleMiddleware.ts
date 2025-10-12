
import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";


export function roleMiddleware(roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user || typeof user !== "object" || !('role' in user) || !roles.includes((user as any).role)) {
      return res.status(403).json({ message: "Forbidden: Insufficient role" });
    }
    next();
  };
}
