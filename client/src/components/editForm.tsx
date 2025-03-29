import { Button } from "@/components/ui/button";
import Question from "./question";
import type { Question as QuestionType } from "../types/types";
import { useEffect, useState } from "react";
import { createForm } from "../services/requests";

export default function EditForm() {
    const [questions, setQuestions] = useState<QuestionType[]>([]);

    function addQuestion() {
        setQuestions([...questions, {id: questions.length, title: '', required: false, selector: 'checkbox', options: ["option"]}]);
    };

    function removeQuestion(index: number) {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    function updateQuestion(index: number, question: QuestionType) {
        setQuestions(questions.map((q, i) => i === index ? question : q));
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
        <div className="edit-form m-6 pb-6">
            <form className="flex flex-row gap-10" action="">
                <div className="left-side flex flex-col gap-4">
                    <input type="text" name="title" id="title" placeholder="Title" />
                    <input type="text" name="description" id="description" placeholder="Description" />

                    {questions.map((question) => (
                        <Question key={question.id} data={question} removeQuestion={removeQuestion} updateQuestion={updateQuestion} />
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