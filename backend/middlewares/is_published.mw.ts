import { NextFunction, Request, Response } from "express";
import { Form } from "../models/associations.model";

export default async function isPublished(req: Request, res: Response, next: NextFunction) {

    const { id } = req.params;

    const form = await Form.findByPk(id);

    if (!form) {
        return res.status(404).json({ message: 'Form not found' });
    }

    if (!form.dataValues.is_published) {
        return res.status(403).json({ message: 'Form is not published' });
    }

    next();
}
