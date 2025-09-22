import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {

    const token = req.cookies.accessToken;

    if(!token) {
        return res.status(401).json({message: 'Vous devez être connecté pour accéder à cette page'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        if (typeof decoded === 'string') {
            return res.status(401).json({message: 'Unauthorized'});
        }
        req.userId = String(decoded.id);

        next();
    } catch (error) {
        return res.status(401).json({message: 'Unauthorized'});
    }
}
