import { Request, Response, NextFunction } from "express";

export function requireSessionAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
}

export function requireAdminSession(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user) return res.redirect("/login");
  if (req.session.user.role !== "admin") return res.status(403).render("errors/403");
  next();
}
