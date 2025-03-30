import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Question as QuestionType } from "../types/types";

export default function Question({id, data, removeQuestion, updateQuestion}: IQuestion) {
    const [selector, setSelector] = useState<string>('checkbox');
    // const [options, setOptions] = useState<string[]>(["option"]);


    return (
        <div className="question flex flex-col gap-2 border p-2 rounded w-fit-content">
            {id}

            <div className="flex items-center justify-between">
                <input type="text" name="title" id="title" placeholder="Title" value={data.title} onChange={(e) => {updateQuestion(id, {...data, title: e.target.value})}} />
                <Button type="button" className="size-8 self-end" onClick={() => removeQuestion(id)}>X</Button>
            </div>

            <label htmlFor="required" className="flex items-center gap-2"> Required
                <input type="checkbox" name="required" id="required" checked={data.required} onChange={(e) => {updateQuestion(id, {...data, required: e.target.checked})}} />
            </label>

            <select name="selector" id="selector" value={data.selector} onChange={(e) => {updateQuestion(id, {...data, selector: e.target.value}); setSelector(e.target.value); setOptions(["option"])}}>
                <option value="checkbox">Checkbox</option>
                <option value="radio">Radio</option>
                <option value="text">Text</option>
            </select>

            <div className="flex flex-col gap-2">
                {data.options.map((option, index) => (
                    <div key={index}>
                    <input type="text" name={`option${index}`} id={`option${index}`}
                     value={option} onChange={(e) => {updateQuestion(id, {...data, options: data.options.map((opt, i) => i === index ? e.target.value : opt)});}} />
                    {selector === 'checkbox' || selector === 'radio' ? <input type={selector} name={`option${index}`} id={`option${index}`} placeholder="Options" /> : null}
                    { data.options.length > 1 && <button type="button" onClick={() => updateQuestion(id, {...data, options: data.options.filter((_, i) => i !== index)})}> 	&#128465;</button>}
                    </div>
                ))}
            </div>

            <Button type="button" onClick={() => updateQuestion(id, {...data, options: [...data.options, "option"]})}>Add Option</Button>
            
            </div>
    );
}

interface IQuestion {
    data: QuestionType;
    id: number;
    removeQuestion: (index: number) => void;
    updateQuestion: (index: number, question: QuestionType) => void;
}