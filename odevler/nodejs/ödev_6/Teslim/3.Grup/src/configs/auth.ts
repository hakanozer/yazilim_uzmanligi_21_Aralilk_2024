import e, { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { dataResult } from "../services/result";
import { eRoles } from "../utils/eRoles";


export const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_secret_key';

export interface AuthRequest extends Request {
    user?: string | JwtPayload;
}
export function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const result = dataResult(403, false, 'Token is empty', null);
    if(!authHeader) return res.status(403).json(result);

    const token = authHeader.split(' ')[1];
    const result2 = dataResult(403,false,'Token is missing!', null);
    if(!token) return res.status(403).json(result2);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        const result3 = dataResult(403,false,'Token is invalid!', null);
        if(err) return res.status(403).json(result3);
        req.user = user;
        next();
    });
}

export function checkRole(...roles: eRoles[]) {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        const user = req.user as JwtPayload;
        const userRoles = user.roles;
        const hasRole = userRoles
        .map(r=> r.toLowerCase())
        .some(r=> roles.map(rr=> rr.toLowerCase()).includes(r));
        if(!hasRole) {
            const result = dataResult(403,false,'You do not have permission to access this resource', null);
            return res.status(403).json(result);
        }
        next();
    }
}