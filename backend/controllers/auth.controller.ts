import { Request, Response } from "express";
import User from "../models/user.model";
import argon2 from "argon2";
import { emailSchema } from "../schemas/email.schema";
import { passwordSchema } from "../schemas/password.schema";

export async function login(req: Request, res: Response) {

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
