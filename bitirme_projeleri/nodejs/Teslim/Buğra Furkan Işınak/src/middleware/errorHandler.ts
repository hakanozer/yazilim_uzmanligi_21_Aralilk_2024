import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'express-validator';
import { logger } from '../utils/logger';

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const createError = (message: string, statusCode: number = 500): AppError => {
  return new AppError(message, statusCode);
};

export const handleValidationError = (errors: ValidationError[]) => {
  const message = errors.map(error => error.msg).join(', ');
  return createError(message, 400);
};

export const handleCastError = (error: any) => {
  const message = `Invalid ${error.path}: ${error.value}`;
  return createError(message, 400);
};

export const handleDuplicateFieldsError = (error: any) => {
  const field = Object.keys(error.keyValue)[0];
  const value = error.keyValue[field];
  const message = `${field} '${value}' already exists`;
  return createError(message, 400);
};

export const handleJWTError = () => {
  return createError('Invalid token. Please log in again!', 401);
};

export const handleJWTExpiredError = () => {
  return createError('Your token has expired! Please log in again.', 401);
};

export const sendErrorDev = (err: AppError, res: Response): void => {
  res.status(err.statusCode || 500).json({
    status: 'error',
    error: err,
    message: err.message,
    stack: err.stack
  });
};

export const sendErrorProd = (err: AppError, res: Response): void => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      status: 'error',
      message: err.message
    });
  } else {
    // Programming or other unknown error: don't leak error details
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!'
    });
  }
};

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Skip logging for Chrome DevTools requests
  if (req.url.includes('.well-known/appspecific/com.chrome.devtools.json')) {
    return res.status(404).json({ error: 'Not found' });
  }

  // Log the error
  logger.error(`Error ${err.statusCode}: ${err.message}`, {
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    stack: err.stack
  });

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'CastError') error = handleCastError(error);
    if (error.code === 11000) error = handleDuplicateFieldsError(error);
    if (error.name === 'ValidationError') {
      const message = Object.values(error.errors).map((val: any) => val.message).join(', ');
      error = createError(message, 400);
    }
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};

export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  // Check if it's an API request
  if (req.originalUrl.startsWith('/api/')) {
    const err = createError(`Not found - ${req.originalUrl}`, 404);
    next(err);
  } else {
    // For web requests, render 404 page
    res.status(404).render('errors/404', {
      title: 'Sayfa Bulunamadı - BFItalks',
      description: 'Aradığınız sayfa mevcut değil'
    });
  }
};
