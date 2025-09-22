import { Request, Response } from "express";
import User from "../models/user.model";
import argon2 from "argon2";
import { emailSchema } from "../schemas/email.schema";
import { passwordSchema } from "../schemas/password.schema";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    const findUser = await User.findOne({where: {email}});

    if(!findUser) {
        return res.status(400).json({message: 'Email ou mot de passe incorrect'});
    }

    const passwordMatch = await argon2.verify(findUser.password, password);

    if(!passwordMatch) {
        return res.status(400).json({message: 'Email ou mot de passe incorrect'});
    }

    const accessToken = jwt.sign({id: findUser.id}, process.env.JWT_SECRET!, { expiresIn: '1h' });
    const refreshToken = jwt.sign({id: findUser.id}, process.env.JWT_SECRET!, { expiresIn: '1d' });
    const csrfToken = uuidv4();

    res.cookie('accessToken', accessToken, 
        { httpOnly: true, 
            secure: false, 
            sameSite: 'lax', 
            maxAge: 60 * 60 * 1000 
        });
    res.cookie('refreshToken', refreshToken, 
        { httpOnly: true, 
            secure: false, 
            sameSite: 'lax', 
            maxAge: 24 * 60 * 60 * 1000 
        });
    res.cookie('csrfToken', csrfToken, 
        { httpOnly: true, 
            secure: false, 
            sameSite: 'lax', 
            maxAge: 24 * 60 * 60 * 1000 
        });

    return res.status(200).json({message: 'Vous avez été connecté avec succès', csrfToken});
}

export async function register(req: Request, res: Response) {
    const {name, email, password, confirmPassword} = req.body;

    if(password !== confirmPassword) 
        return res.status(400).json({message: 'Les mots de passe ne correspondent pas'});
    
    const emailValidation = emailSchema.safeParse(email);
    const passwordValidation = passwordSchema.safeParse(password);
    
    if(!passwordValidation.success) {
        const messages = passwordValidation.error?.issues?.map((issue: any) => issue.message);
        return res.status(400).json({messages: messages});
    }

    if(!emailValidation.success) {
        const messages = emailValidation.error?.issues?.map((issue: any) => issue.message);
        return res.status(400).json({message: messages});
    }

    try {
        const findUser = await User.findOne({where: {email}});
        
        if(findUser) {
            return res.status(400).json({message: 'Cet email est déjà utilisé'});
        }
        
        const hashPassword = await argon2.hash(password);
        
        await User.create({name, email, password: hashPassword});
        
        return res.status(201).json({message: 'User created successfully'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Server error'});
    }
}

export function logout(req: Request, res: Response) {
    
}

export function refresh(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken) {
        return res.status(401).json({message: 'Unauthorized'});
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!);

    if(typeof decoded === 'string') {
        return res.status(401).json({message: 'Unauthorized'});
    }

    const accessToken = jwt.sign({id: decoded.id}, process.env.JWT_SECRET!, { expiresIn: '1h' });

    res.cookie('accessToken', accessToken, 
        { httpOnly: true, 
            secure: false, 
            sameSite: 'lax', 
            maxAge: 60 * 60 * 1000 
        });

    return res.status(200).json({message: 'Token refreshed successfully'});
}
