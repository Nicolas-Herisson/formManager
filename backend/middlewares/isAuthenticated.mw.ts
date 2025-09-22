import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.accessToken;

    if(!token) {
        return res.status(401).json({message: 'Vous devez être connecté pour accéder à cette page'});
    }
    try {
        const decoded = jwt.verify(token, process.env.SALT!);
        if (typeof decoded === 'string') {
            return res.status(401).json({message: 'Unauthorized'});
        }
        req.userId = String(decoded.id);

        next();
    } catch (error) {
        return res.status(401).json({message: 'Unauthorized'});
    }
}

export const validateCSRF = (req: Request, res: Response, next: NextFunction) => {
    const csrfToken = req.cookies.csrfToken;
    const token = req.headers['x-csrf-token'];

    if(!csrfToken || !token) {
        return res.status(401).json({message: 'Unauthorized'});
    }

    if(csrfToken !== token) {
        return res.status(401).json({message: 'Unauthorized'});
    }

    next();
}

export const authenticateAndCsrf = (req: Request, res: Response, next: NextFunction) => {
    isAuthenticated(req, res, (error) => {
        if(error) {
            return next(error);
        }
        validateCSRF(req, res, next);
    });
}