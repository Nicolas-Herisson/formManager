import {Form} from "../models/associations.model.js";

export async function createForm(req, res) {
    try {
        const form  = req.body;
        const newForm = await Form.create({ title: form.title, description: form.description });

        for (const question of form.questions) {
            const newQuestion = await newForm.createQuestion({
                title: question.title,
                selector: question.selector,
                required: question.required
            });

            for (const option of question.options) {
                await newQuestion.createOption({
                    title: option.title,
                    checked: option.checked
                });
            }
        }

        res.status(201).json(newForm);
    } catch (error) {
        console.error('Error creating form:', error);
        res.status(500).json({ error: error.message });
    }
}

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

        res.status(200).json(forms);
    } catch (error) {
        console.error('Error getting forms:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function getForm(req, res) {
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
    } catch (error) {
        console.error('Error getting form:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function updateForm(req, res) {
    try {
        const { id } = req.params;
        const { title, description, questions } = req.body;

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
        
        await form.update({ title, description });

        const bodyQuestionIds = questions.filter(q => q.id > 0).map(q => q.id);
        
        // Delete questions
        for (const dbQuestion of form.questions) {
            if (!bodyQuestionIds.includes(dbQuestion.id)) {
                await dbQuestion.options.forEach(async (opt) => await opt.destroy());
                await dbQuestion.destroy();
            }
        }

        for (const bodyQuestion of questions) {
            let dbQuestion = form.questions.find((q) => q.id === bodyQuestion.id);
            
            if (dbQuestion) {
                // Update question
                await dbQuestion.update({
                    title: bodyQuestion.title,
                    selector: bodyQuestion.selector,
                    required: bodyQuestion.required
                });

                const bodyOptionIds = bodyQuestion.options.filter(o => o.id > 0).map(o => o.id);
                
                // Delete options
                for (const dbOption of dbQuestion.options) {
                    if (!bodyOptionIds.includes(dbOption.id)) {
                        await dbOption.destroy();
                    }
                }

                // Update or create options
                for (const bodyOption of bodyQuestion.options) {
                    if (bodyOption.id > 0) {
                        const dbOption = dbQuestion.options.find((o) => o.id === bodyOption.id);
                        if (dbOption) {
                            await dbOption.update({
                                title: bodyOption.title,
                                checked: bodyOption.checked
                            });
                        }
                    } else {
                        await dbQuestion.createOption({
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
                    await createdQuestion.createOption({
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
    } catch (error) {
        console.error('Error updating form:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function deleteForm(req, res) {
    try {
        const { id } = req.params;

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