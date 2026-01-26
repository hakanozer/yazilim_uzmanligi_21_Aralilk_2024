import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import { ZodError } from "zod";

export const notFound = (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Not Found - ${req.originalUrl}`, 404));
};

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) {
    const issues = (err as any).issues || (err as any).errors || [];

    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: issues.map((e: any) => ({
        path: Array.isArray(e.path) ? e.path.join(".") : "",
        message: e.message,
      })),
    });
  }

  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err instanceof AppError ? err.message : "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    message,
  });
};
