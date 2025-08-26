import { Response } from "../models/associations.model.js";
import { Form } from "../models/associations.model.js";

export async function createResponse(req, res) {
    try {
        const { form_id, response } = req.body;

        const findedForm = await Form.findByPk(form_id);

        if (!findedForm) {
            return res.status(404).json({ error: 'Form not found' });
        }
        
        const newResponse = await Response.create({ form_id, response });

        res.status(201).json(newResponse);
    } catch (error) {
        console.error('Error creating response:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function getResponses(req, res) {
    try {

        const { form_id } = req.params;
        const responses = await Response.findAll({ where: { form_id } });

        res.status(200).json(responses);
    } catch (error) {
        console.error('Error fetching responses:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function getResponse(req, res) {
    try {
        
        const { form_id, response_id } = req.params;
        const response = await Response.findOne({ where: { form_id, id: response_id } });
        
        if (!response) {
            return res.status(404).json({ error: 'Response not found' });
        }
        
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching response:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function deleteResponse(req, res) {
    try {
        
        const { form_id, response_id } = req.params;
        const response = await Response.findOne({ where: { form_id, id: response_id } });
        
        if (!response) {
            return res.status(404).json({ error: 'Response not found' });
        }
        
        await response.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting response:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function deleteResponsesByFormId(req, res) {
    try {
        
        const { form_id } = req.params;
        const responses = await Response.findAll({ where: { form_id } });
        
        await Promise.all(responses.map(response => response.destroy()));
        
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting responses:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function updateResponse(req, res) {
    try {
        
        const { form_id, response_id } = req.params;
        const { response } = req.body;
        
        const existingResponse = await Response.findOne({ where: { form_id, id: response_id } });
        
        if (!existingResponse) {
            return res.status(404).json({ error: 'Response not found' });
        }
        
        existingResponse.response = JSON.stringify(response);
        await existingResponse.save();
        
        res.status(200).json(existingResponse);
    } catch (error) {
        console.error('Error updating response:', error);
        res.status(500).json({ error: error.message });
    }
}