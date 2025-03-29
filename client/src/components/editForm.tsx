import { Button } from "@/components/ui/button";
import Question from "./question";
import type { JSX } from "react";
import { useEffect, useState } from "react";

export default function EditForm() {
    const [questions, setQuestions] = useState<JSX.Element[]>([]);

    useEffect(() => {
        setQuestions([<Question key={0} />]);
    }, []);

    return (
        <div className="edit-form m-6 pb-6">
            <form className="flex flex-row gap-10">
                <div className="left-side flex flex-col gap-4">
                    <input type="text" name="title" id="title" placeholder="Title" />
                    <input type="text" name="description" id="description" placeholder="Description" />

                    {questions}
                    
                </div>

                <div className="right-side flex flex-col gap-4 justify-end">
                <Button type="button" onClick={() => setQuestions([...questions, <Question key={questions.length} />])}>Add question</Button>
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </div>
    );
}