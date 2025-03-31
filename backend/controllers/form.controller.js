import {Form, Question, Option} from "../models/associations.model.js";

export async function getForms(req, res) {
    try {
        const forms = await Form.findAll({
            include: [
                {
                    association: 'questions',
                    include: [
                        {
                            association: 'options'
                        }
                    ]
                }
            ]
        });

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
        const {title, description, questions} = form;

        const newForm = await Form.create(
        {
            title,
            description,
            questions: questions.map((question) => ({
                title: question.title,
                selector: question.selector,
                required: question.required,
                options: question.options.map((option) => ({
                    title: option.title,
                    checked: option.checked
                }))
            }))
        },
        {
            include: [
                {
                    association: 'questions',
                    include: [
                        {
                            association: 'options'
                        }
                    ]
                }
            ]
        }
        );

        res.status(201).json(newForm);
    } catch (error) {
        console.error('Error creating form:', error);
    if (error.name === 'SequelizeValidationError') {
        res.status(400).json({ error: error.errors.map(e => e.message) });
    } else {
        res.status(500).json({ error: error.message });
    }
    }
}

export  async function getForm(req, res) {
    try {
        const {id} = req.params;
        const form = await Form.findByPk(id, {
            include: [
                {
                    association: 'questions',
                    include: [
                        {
                            association: 'options'
                        }
                    ]
                }
            ]
        });
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.status(200).json(form);
    } catch (error) {
        console.error('Error getting form:', error);
        res.status(500).json({ error: error.message });
    }
}

export  async function updateForm(req, res) {
    try {
        const {id} = req.params;
        const form = req.body;
        const {title, description, questions} = form;
        
        const updatedForm = await Form.update({
            title,
            description,
            questions: questions.map((question) => ({
                title: question.title,
                selector: question.selector,
                required: question.required,
                options: question.options.map((option) => ({
                    title: option.title,
                    checked: option.checked
                }))
            }))
        }, {
            where: {id}
        }, {
            include: [
                {
                    association: 'questions',
                    include: [
                        {
                            association: 'options'
                        }
                    ]
                }
            ]
        });
        
        res.status(200).json(updatedForm);
    } catch (error) {
        console.error('Error updating form:', error);
        res.status(500).json({ error: error.message });
    }
}

export  async function deleteForm(req, res) {
    try {
        const {id} = req.params;
        const form = await Form.findByPk(id);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        await form.destroy();
        res.status(200).json({ message: 'Form deleted successfully' });
    } catch (error) {
        console.error('Error deleting form:', error);
        res.status(500).json({ error: error.message });
    }
}