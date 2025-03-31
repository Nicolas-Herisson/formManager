import { Button } from "@/components/ui/button";
import Question from "./question";
import type { Question as QuestionType } from "../types/types";
import { useEffect } from "react";
import { fetchGetForm } from "../services/requests";
import type { Form } from "@/types/types";

export default function EditForm({form, setForm, updateForm, addForm}: IEditFormProps) {

    function addQuestion() {
        setForm({...form, questions: [...form.questions, {id: form.questions.length + 1, title: '', required: false, selector: 'checkbox', options: [{id: 0, title: "", checked: false}]}]});
    };

    function removeQuestion(id: number) {
        setForm({...form, questions: form.questions.filter((q) => q.id !== id)});
    };

    function updateQuestion(id: number, question: QuestionType) {
        setForm({...form, questions: form.questions.map((q) => q.id === id ? question : q)});
    };
    
    async function handleSubmit(formData: FormData) {
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const newForm = {id: form.id, title, description, questions: form.questions};

        const oldForm = await fetchGetForm(form.id);

        if (oldForm) {
            await updateForm(oldForm.id, newForm);
        } else {
            await addForm(newForm);
        }
    }

    useEffect(() => {
        addQuestion();
    }, []);

    return (
        <div className="edit-form m-6 pb-6 w-7/8">
            <form className="flex flex-row gap-10" action={handleSubmit}>
                <div className="left-side flex flex-col gap-4">
                    <input type="text" name="title" id="title" placeholder="Title" value={form.title} onChange={(e) => {setForm({...form, title: e.target.value})}} />
                    <input type="text" name="description" id="description" placeholder="Description" value={form.description} onChange={(e) => {setForm({...form, description: e.target.value})}} />

                    {form.questions.map((question) => (
                        <Question key={question.id} id={question.id} data={question} removeQuestion={removeQuestion} updateQuestion={updateQuestion} />
                    ))}
                    
                </div>

                <div className="right-side flex flex-col gap-4 justify-end">
                    <Button type="button" onClick={() => addQuestion()}>Add question</Button>
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </div>
    );
}

interface IEditFormProps {
    form: Form;
    setForm: React.Dispatch<React.SetStateAction<Form>>;
    updateForm: (id: number, form: Form) => void;
    addForm: (form: Form) => void;
}
