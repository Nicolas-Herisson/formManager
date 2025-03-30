import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Question as QuestionType } from "../types/types";
import type { Option } from "../types/types";
import SelectorOption from "./selectorOption";

export default function Question({id, data, removeQuestion, updateQuestion}: IQuestion) {
    const [optionId, setOptionId] = useState<number>(1);

    function addOption() {
        const newOption = {id: optionId, title: "", checked: false};
        updateQuestion(id, {...data, options: [...data.options, newOption]});
        setOptionId(optionId + 1);
    };

    function removeOption(optionId: number) {
        updateQuestion(id, {...data, options: data.options.filter((opt) => opt.id !== optionId)});
    };

    function updateOption(optionId: number, option: Option) {
        updateQuestion(id, {...data, options: data.options.map((opt) => opt.id === optionId ? option : opt)});
    };
    // const [options, setOptions] = useState<string[]>(["option"]);


    return (
        <div className="question flex flex-col gap-2 border p-2 rounded w-150">

            <div className="flex items-center justify-between">
                <input className="w-100" type="text" name="title" id="title" placeholder="Title" value={data.title} onChange={(e) => {updateQuestion(id, {...data, title: e.target.value})}} />
                <Button type="button" className="size-8 self-end" onClick={() => removeQuestion(id)}>X</Button>
            </div>

            <label htmlFor="required" className="flex items-center gap-2"> Required
                <input type="checkbox" name="required" id="required" checked={data.required} onChange={(e) => {updateQuestion(id, {...data, required: e.target.checked})}} />
            </label>

            <select name="selector" id="selector" value={data.selector} onChange={(e) => { updateQuestion(id, {...data, selector: e.target.value, options: [{id: 0, title: "", checked: false}]}); }}>
                <option value="checkbox">Checkbox</option>
                <option value="radio">Radio</option>
                <option value="text">Text</option>
            </select>

            <div className="flex flex-col gap-2">
                {data.selector === 'checkbox' || data.selector === 'radio' ? data.options.map((option) => (
                    <div key={option.id}>
                        <SelectorOption id={option.id} selector={data.selector} data={option} removeOption={removeOption} updateOption={updateOption} />
                    </div>
                )) : null}
            </div>

            <Button type="button" onClick={() => addOption()}>Add Option</Button>
            
            </div>
    );
}

interface IQuestion {
    data: QuestionType;
    id: number;
    removeQuestion: (index: number) => void;
    updateQuestion: (index: number, question: QuestionType) => void;
}