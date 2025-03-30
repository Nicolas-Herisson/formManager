import {Form} from "../models/associations.model.js";

export async function getForms(req, res) {
    try {
        const forms = await Form.findAll();

        if (!forms) {
            return res.status(404).json({ message: 'Error occured while fetching forms' });
        }

        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function createForm(req, res) {
    try {
        const form = req.body;

        const newForm = await Form.create(form);

        res.status(201).json(newForm);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export  function getForm(req, res) {
    res.send('Hello World!');
}

export  function updateForm(req, res) {
    res.send('Hello World!');
}

export  function deleteForm(req, res) {
    res.send('Hello World!');
}