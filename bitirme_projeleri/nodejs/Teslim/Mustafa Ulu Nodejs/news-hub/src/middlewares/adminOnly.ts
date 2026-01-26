import { Request, Response, NextFunction } from "express";

export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  const u = (req.session as any)?.user;
  if (!u) return res.redirect("/login");

  if (u.role !== "admin") {
    return res.status(403).render("errors/403", { user: u });
  }

  return next();
};
