import { Button } from "@/components/ui/button";
import Question from "./question";
import type { Question as QuestionType } from "../types/types";
import { useEffect, useState } from "react";
import { createForm } from "../services/requests";

export default function EditForm() {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [id, setId] = useState<number>(0);

    function addQuestion() {
        setQuestions([...questions, {id: id, title: '', required: false, selector: 'checkbox', options: ["option"]}]);
        setId(id + 1);
    };

    function removeQuestion(id: number) {
        setQuestions(questions.filter((q) => q.id !== id));
    };

    function updateQuestion(id: number, question: QuestionType) {
        setQuestions(questions.map((q) => q.id === id ? question : q));
    };
    
    // function handleSubmit(formData: FormData) {
    //     const title = formData.get('title');
    //     const description = formData.get('description');

    //     createForm(formData, questions);
    // }

    useEffect(() => {
        setQuestions([{
            id: 0,
            title: '',
            required: false,
            selector: 'checkbox',
            options: ['option']
        }]);
    }, []);

    return (
        <div className="edit-form m-6 pb-6 w-7/8">
            <form className="flex flex-row gap-10" action="">
                <div className="left-side flex flex-col gap-4">
                    <input type="text" name="title" id="title" placeholder="Title" />
                    <input type="text" name="description" id="description" placeholder="Description" />

                    {questions.map((question) => (
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