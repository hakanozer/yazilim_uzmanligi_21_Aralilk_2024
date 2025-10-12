import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jsonResult } from "../models/result";
import { eRoles } from "../utils/eRoles";
import { SECRET_KEY } from "../config/auth";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    roles: eRoles[];
  };
}

export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  
  console.log('🔐 Authorization Header:', authHeader); // DEBUG
  
  if (!authHeader) {
    const result = jsonResult(401, false, "Authorization header required!", null);
    return res.status(401).json(result);
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    const result = jsonResult(401, false, "Token format should be: Bearer [token]", null);
    return res.status(401).json(result);
  }

  const token = parts[1];
  if (!token) {
    const result = jsonResult(401, false, "Bearer token missing!", null);
    return res.status(401).json(result);
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log('❌ Token verification error:', err.message);
      const result = jsonResult(403, false, "Token invalid or expired!", null);
      return res.status(403).json(result);
    }
    
    req.user = decoded as AuthenticatedRequest['user'];
    console.log('✅ User authenticated:', req.user);
    next();
  });
};

export const checkRole = (...allowedRoles: eRoles[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      const result = jsonResult(401, false, "Authentication required!", null);
      return res.status(401).json(result);
    }

    const userRoles = req.user.roles;
    
    const hasRole = userRoles.some(role => 
      allowedRoles.some(allowedRole => 
        allowedRole.toLowerCase() === role.toLowerCase()
      )
    );

    if (!hasRole) {
      const result = jsonResult(403, false, "Insufficient permissions for this action", null);
      return res.status(403).json(result);
    }

    next();
  };
};

// Ön tanımlı role check'ler
// Ön tanımlı role check'ler
export const isAdmin = checkRole(eRoles.Admin);
export const isProjectManager = checkRole(eRoles.ProjectManager);
export const isDeveloper = checkRole(eRoles.Developer);
export const isManagement = checkRole(eRoles.Admin, eRoles.ProjectManager);
export const anyRole = checkRole(eRoles.Admin, eRoles.ProjectManager, eRoles.Developer);