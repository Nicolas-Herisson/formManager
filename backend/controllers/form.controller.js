import {Form, Question, Option} from "../models/associations.model.js";

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
        const {title, description, questions} = form;
        console.log(form);

        const newForm = await Form.create(
        {
            title,
            description,
            questions: questions.map((question) => ({
                description: question.description,
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
                    association: Question,
                    include: [Option]
                }
            ]
        }
        );

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