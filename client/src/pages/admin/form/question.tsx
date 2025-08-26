import { Button } from "@/components/ui/button";
import type { Question as QuestionType } from "../../../types/types";
import type { Option } from "../../../types/types";
import SelectorOption from "./selectorOption";
import { Trash2 } from "lucide-react";

export default function Question({id, data, removeQuestion, updateQuestion, questionNumber}: IQuestion) {
    
    function addOption() {
        const newOption = {id: data.options.length + 1, title: "", checked: false};
        updateQuestion(id, {...data, options: [...data.options, newOption]});
    };

    function removeOption(optionId: number) {
        updateQuestion(id, {...data, options: data.options.filter((opt) => opt.id !== optionId)});
    };

    function updateOption(optionId: number, option: Option) {
        updateQuestion(id, {...data, options: data.options.map((opt) => opt.id === optionId ? option : opt)});
    };

    return (
        <div className="question flex flex-col gap-4 p-4 border border-gray-200 rounded-lg bg-white">
            <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                onClick={() => removeQuestion(id)}
                className="text-red-600 hover:bg-red-50 hover:text-red-700 self-end"
                title="Supprimer la question"
            >
                <Trash2 size={16} />
            </Button>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                    <span className="font-medium text-gray-600">{questionNumber}.</span>
                    <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        placeholder="Titre de la question" 
                        value={data.title} 
                        onChange={(e) => {updateQuestion(id, {...data, title: e.target.value})}}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                    />
                </div>
            </div>

            <label htmlFor={`required-${id}`} className="flex items-center gap-2 text-sm text-gray-700">
                <input 
                    type="checkbox" 
                    id={`required-${id}`} 
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    checked={data.required} 
                    onChange={(e) => {updateQuestion(id, {...data, required: e.target.checked})}} 
                />
                Requis
            </label>

            <select 
                name="selector" 
                id={`selector-${id}`}
                className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                value={data.selector} 
                onChange={(e) => { updateQuestion(id, {...data, selector: e.target.value, options: [{id: 0, title: "", checked: false}]}); }}
            >
                <option value="checkbox">Cases à cocher</option>
                <option value="radio">Boutons radio</option>
                <option value="text">Champ texte</option>
            </select>

            <div className="flex flex-col gap-2">
                {data.selector === 'checkbox' || data.selector === 'radio' ? data.options.map((option) => (
                    <div key={option.id}>
                        <SelectorOption id={option.id} data={option} removeOption={removeOption} updateOption={updateOption} />
                    </div>
                )) : null}
            </div>

            {(data.selector === 'checkbox' || data.selector === 'radio') && (
                <Button 
                    type="button" 
                    variant="outline"
                    onClick={addOption}
                    className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M5 12h14"/>
                        <path d="M12 5v14"/>
                    </svg>
                    Ajouter une option
                </Button>
            )}
        </div>
    );
}

interface IQuestion {
    id: number;
    data: QuestionType;
    removeQuestion: (id: number) => void;
    updateQuestion: (id: number, question: QuestionType) => void;
    questionNumber: number;
}