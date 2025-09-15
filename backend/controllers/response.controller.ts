import { Response as ResponseModel } from "../models/associations.model";
import { Form } from "../models/associations.model";
import { Request, Response as ExpressResponse } from "express";

export async function createResponse(req: Request, res: ExpressResponse) {
    try {
        const { form_id, response } = req.body;

        const findedForm = await Form.findByPk(form_id);

        if (!findedForm) {
            return res.status(404).json({ error: 'Form not found' });
        }

        const newResponse = await ResponseModel.create({ form_id, response: JSON.stringify(response) });

        res.status(201).json(newResponse.dataValues);
    } catch (error: any) {
        console.error('Error creating response:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function getResponses(req: Request, res: ExpressResponse) {
    try {
        const { form_id } = req.params;

        const responses = await ResponseModel.findAll({ where: { form_id }, raw: true });

        res.status(200).json(responses);
    } catch (error: any) {
        console.error('Error fetching responses:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function getResponse(req: Request, res: ExpressResponse) {
    try {
        const { form_id, response_id } = req.params;

        const response = await ResponseModel.findOne({ where: { form_id, id: response_id } });
                
        if (!response) {
            return res.status(404).json({ error: 'Response not found' });
        }
        
        res.status(200).json(response);
    } catch (error: any) {
        console.error('Error fetching response:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function deleteResponse(req: Request, res: ExpressResponse) {
    try {
        const { form_id, response_id } = req.params;

        const response = await ResponseModel.findOne({ where: { form_id, id: response_id } });
        
        if (!response) {
            return res.status(404).json({ error: 'Response not found' });
        }
        
        await response.destroy();

        res.status(204).send();
    } catch (error: any) {
        console.error('Error deleting response:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function deleteResponsesByFormId(req: Request, res: ExpressResponse) {
    try {
        const { form_id } = req.params;

        const responses = await ResponseModel.findAll({ where: { form_id } });
        
        await Promise.all(responses.map(response => response.destroy()));
        
        res.status(204).send();
    } catch (error: any) {
        console.error('Error deleting responses:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function updateResponse(req: Request, res: ExpressResponse) {
    try {
        const { form_id, response_id } = req.params;
        const { response } = req.body;
        
        const existingResponse = await ResponseModel.findOne({ where: { form_id, id: response_id } });
        
        if (!existingResponse) {
            return res.status(404).json({ error: 'Response not found' });
        }
        
        existingResponse.response = response;
        
        await existingResponse.save();
        
        res.status(200).json(existingResponse);
    } catch (error: any) {
        console.error('Error updating response:', error);
        res.status(500).json({ error: error.message });
    }
}