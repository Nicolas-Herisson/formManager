import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Question() {
    const [selector, setSelector] = useState<string>('checkbox');
    const [options, setOptions] = useState<string[]>(["option"]);


    return (
        <div className="question flex flex-col gap-2 border p-2 rounded ml-4">
            <input type="text" name="title" id="title" placeholder="Title" />
            <label htmlFor="required" className="flex items-center gap-2"> Required
                <input type="checkbox" name="required" id="required"  />
            </label>
            <select name="selector" id="selector" value={selector} onChange={(e) => {setSelector(e.target.value); setOptions(["option"])}}>
                <option value="checkbox">Checkbox</option>
                <option value="radio">Radio</option>
                <option value="text">Text</option>
            </select>

            <div className="flex flex-col gap-2">
                {options.map((option, index) => (
                    <div key={index}>
                    <input type="text" name={`option${index}`} id={`option${index}`} value={option} onChange={(e) => {setOptions(options.map((opt, i) => i === index ? e.target.value : opt));}} />
                    {selector === 'checkbox' || selector === 'radio' ? <input type={selector} name={`option${index}`} id={`option${index}`} placeholder="Options" /> : null}
                    { options.length > 1 && <button type="button" onClick={() => setOptions(options.filter((_, i) => i !== index))}> 	&#128465;</button>}
                    </div>
                ))}
            </div>

            <Button type="button" onClick={() => setOptions([...options, "option"])}>Add Option</Button>
            </div>
    );
}