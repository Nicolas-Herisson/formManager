import {Form} from "../models/associations.model";
import { Request, Response as ExpressResponse } from "express";
import Question from "../models/questions.model";
import Option from "../models/option";

export async function createForm(req: Request, res: ExpressResponse) {
    try {
        const { title, description, questions } = req.body;
        const newForm = await Form.create({ title, description });

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
                            association: 'options'
                        }
                    ]
                }
            ]
        });
        console.log(JSON.stringify(forms));

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
    } catch (error: any) {
        console.error('Error getting form:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function updateForm(req: Request, res: ExpressResponse) {
    console.log("in update");
    try {
        const { id } = req.params;
        const { title, description, questions } = req.body;

        const form = await Form.findByPk(id, {
            include: [
                {
                    model: Question,
                    as: 'questions',
                    include: [
                        {
                            model: Option,
                            as: 'options'
                        }
                    ]
                }
            ]
        });
        console.log("update form : ", JSON.stringify(form));
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        
        await form.update({ title, description });

        const bodyQuestionIds = questions.filter((q: Question) => q.id > 0).map((q: Question) => q.id);
        const questionsInDB = await form.getQuestions();
        console.log("update questions : ", JSON.stringify(questions));
        // Delete questions
        for (const dbQuestion of questionsInDB) {

            const question = dbQuestion as Question;

            if (!bodyQuestionIds.includes(question.id)) {

                if (Array.isArray(question.options)) {
                    
                    await Promise.all(question.options.map(option => (option as Option).destroy()));
                }
                await question.destroy();
            }
        }

        for (const bodyQuestion of questions) {
            let dbQuestion = questionsInDB.find((q) => q.id === bodyQuestion.id);
            
            if (dbQuestion) {
                // Update question
                const question = dbQuestion as Question;
                await question.update({
                    title: bodyQuestion.title,
                    selector: bodyQuestion.selector,
                    required: bodyQuestion.required
                });

                const bodyOptionIds = bodyQuestion.options.filter((o: Option) => o.id > 0).map((o: Option) => o.id);
                const optionsInDB = await question.getOptions();
                
                // Delete options
                if (optionsInDB) {
                    for (const dbOption of optionsInDB) {
                        if (!bodyOptionIds.includes(dbOption.id)) {
                            await dbOption.destroy();
                        }
                    }
                }

                // Update or create options
                for (const bodyOption of bodyQuestion.options) {
                    if (bodyOption.id > 0) {
                        const dbOption = dbQuestion.options?.find((o) => o.id === bodyOption.id);
                        if (dbOption) {
                            await dbOption.update({
                                title: bodyOption.title,
                                checked: bodyOption.checked
                            });
                        }
                    } else {
                        await dbQuestion.createOption?.({
                            title: bodyOption.title,
                            checked: bodyOption.checked
                        });
                    }
                }
            } else {
                // Create new question
                const createdQuestion = await form.createQuestion({
                    title: bodyQuestion.title,
                    selector: bodyQuestion.selector,
                    required: bodyQuestion.required
                });

                // Create options for the new question
                for (const option of bodyQuestion.options) {
                    await createdQuestion.createOption?.({
                        title: option.title,
                        checked: option.checked
                    });
                }
            }
        }

        const updatedForm = await Form.findByPk(form.id, {
            include: [
                {
                    association: 'questions',
                    include: ['options']
                }
            ]
        });

        res.json(updatedForm);
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