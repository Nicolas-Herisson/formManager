import type { Option } from "../../types/types";
import { Button } from "@/components/ui/button";

export default function SelectorOption({id, selector, data, removeOption, updateOption}: ISelectorOption) {
    
    return (
        <label className="flex items-center gap-2">
                <input type="text" name={`${id}`} id={`${id}`} placeholder="Option" value={data.title} onChange={(e) => {updateOption(id, {...data, title: e.target.value})}} />

                <input type={selector} name={`${id}`} id={`${id}`} checked={data.checked} onChange={(e) => {updateOption(id, {...data, checked: e.target.checked})}} />
            <Button type="button" className="size-8 self-end" onClick={() => removeOption(id)}>X</Button>
        </label>
    );
}

interface ISelectorOption {
    id: number;
    selector: string;
    data: Option;
    removeOption: (id: number) => void;
    updateOption: (id: number, option: Option) => void;
}
