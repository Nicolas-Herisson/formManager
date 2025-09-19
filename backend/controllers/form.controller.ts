import {Form} from "../models/associations.model";
import { Request, Response as ExpressResponse } from "express";
import Question from "../models/questions.model";
import Option from "../models/option";

export async function createForm(req: Request, res: ExpressResponse) {
    try {
        const { title, description, questions } = req.body;
        const newForm = await Form.create({ title, description, is_published: false });

        const createdQuestions = await Promise.all(

            questions.map(async (question: Question) => {

                const createdQuestion = await Question.create({
                    title: question.title,
                    selector: question.selector,
                    required: question.required,
                    form_id: newForm.dataValues.id,
                });

                return createdQuestion;
            })
        );

        for (const question of questions) {

            await Promise.all(
                question.options.map(async (option: Option) => {

                    return await Option.create({
                        title: option.title,
                        checked: option.checked,
                        question_id: createdQuestions.find((q: Question) => q.dataValues.title === question.title)?.dataValues.id,
                    });
                })
            );
        }

        const createdForm = await Form.findByPk(newForm.dataValues.id, {
            include: [
                {
                    association: 'questions',
                    include: [{ association: 'options' }]
                }
            ],
            order: [
                [{ model: Question, as: 'questions' }, 'id', 'ASC'],
                [{ model: Question, as: 'questions' }, { model: Option, as: 'options' }, 'id', 'ASC'],
            ]
        });

        res.status(201).json(createdForm);

    } catch (error: any) {
        console.error('Error creating form:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function getForms(req: Request, res: ExpressResponse) {
    try {
        const forms = await Form.findAll({
            include: [
                {
                    association: 'questions',
                    include: [
                        {
                            association: 'options',
                        }
                    ]
                }
            ],
            order: [
                [{ model: Question, as: 'questions' }, 'id', 'ASC'],
                [{ model: Question, as: 'questions' }, { model: Option, as: 'options' }, 'id', 'ASC']
            ]
        });

        res.status(200).json(forms);
    } catch (error: any) {
        console.error('Error getting forms:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function getForm(req: Request, res: ExpressResponse) {
    try {
        const { id } = req.params;

        const form = await Form.findByPk(id, {
            include: [
                {
                    association: 'questions',
                    include: [
                        {
                            association: 'options',
                        }
                    ]
                }
            ],
            order: [
                [{ model: Question, as: 'questions' }, 'id', 'ASC'],
                [{ model: Question, as: 'questions' }, { model: Option, as: 'options' }, 'id', 'ASC']
            ]
        });
        
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        
        res.status(200).json(form);
    } catch (error: any) {
        console.error('Error getting form:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function updateForm(req: Request, res: ExpressResponse) {
    try {
        const { id } = req.params;
        const { title, description, is_published, questions } = req.body;

        const form = await Form.findByPk(id, {
            include: [
                {
                    association: 'questions',
                    include: [{ association: 'options' }]
                }
            ],
            order: [
                [{ model: Question, as: 'questions' }, 'id', 'ASC'],
                [{ model: Question, as: 'questions' }, { model: Option, as: 'options' }, 'id', 'ASC']
            ]
        });

        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        
        await form.update({ title, description, is_published });

        const questionsInDB = form.dataValues.questions;

        if (!questionsInDB) {
            return res.status(404).json({ message: 'Questions not found' });
        }

        const optionsInDB = questionsInDB.map((q: Question) => q.dataValues.options);
        // extract sub array to create one array
        const flatOptionsInDB = optionsInDB.flat();

        if (!flatOptionsInDB) {
            return res.status(404).json({ message: 'Options not found' });
        }


        const questionsToDelete = questionsInDB.filter((q: Question) => !questions.find((q2: Question) => q2.id === q.dataValues.id));
        const questionsToCreate = questions.filter((q: Question) => !questionsInDB.find((q2: Question) => q2.dataValues.id === q.id));
        const questionsToUpdate = questions.filter((q: Question) => questionsInDB.find((q2: Question) => q2.dataValues.id === q.id));
        
        // Delete questions
        for (const question of questionsToDelete) {
            await question.destroy();
        }

        // Create questions
        for (const question of questionsToCreate) {
            const createdQuestion = await Question.create({
                title: question.title,
                selector: question.selector,
                required: question.required,
                form_id: form.dataValues.id,
            });

            // Create options
            for (const option of question.options) {
                await Option.create({
                    title: option.title,
                    checked: option.checked,
                    question_id: createdQuestion.dataValues.id,
                });
            }
        }

        // Update questions
        for (const question of questionsToUpdate) {
            await Question.update({
                title: question.title,
                selector: question.selector,
                required: question.required,
            }, {
                where: {
                    id: question.id
                }
            });

            const dbOptionsForCurrentQuestion = flatOptionsInDB
            .filter((opt: Option) => opt.dataValues.question_id === question.id);

            const payloadOptionsIds = new Set(
                (question.options ?? [])
                  .map((opt: any) => opt.id)
              );

            const optionsToDelete = dbOptionsForCurrentQuestion
            .filter((opt: Option) => !payloadOptionsIds.has(opt.dataValues.id));

            // Delete options
            for (const option of optionsToDelete) {
                await option.destroy();
            }

            for (const option of question.options) {
                // Update options
                if (flatOptionsInDB
                    .find((opt: Option) => opt.dataValues.id === option.id && 
                    opt.dataValues.question_id === question.id)) {

                    await Option.update({
                        title: option.title,
                        checked: option.checked,
                    }, {
                        where: {
                            id: option.id
                        }
                    });
                }
                // Create options
                else {
                    await Option.create({
                        title: option.title,
                        checked: option.checked,
                        question_id: question.id,
                    });
                }
            }
        }

        const formUpdated = await Form.findByPk(id, {
            include: [
                {
                    association: 'questions',
                    include: [{ association: 'options' }]
                }
            ],
            order: [
                [{ model: Question, as: 'questions' }, 'id', 'ASC'],
                [{ model: Question, as: 'questions' }, { model: Option, as: 'options' }, 'id', 'ASC']
            ]
        });


        res.status(200).json(formUpdated);

    } catch (error: any) {
        console.error('Error updating form:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function deleteForm(req: Request, res: ExpressResponse) {
    try {
        const { id } = req.params;

        const form = await Form.findByPk(id);
        
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        
        await form.destroy();
        res.status(200).json({ message: 'Form deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting form:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function publishForm(req: Request, res: ExpressResponse) {
    try {
        const { id } = req.params;

        const form = await Form.findByPk(id);

        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }

        await form.update({ is_published: !form.dataValues.is_published });

        res.status(200).json({ message: form.dataValues.is_published ? 'Form published' : 'Form unpublished' });
    } catch (error: any) {
        console.error('Error publishing form:', error);
        res.status(500).json({ error: error.message });
    }
}
