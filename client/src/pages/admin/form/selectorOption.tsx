import type { Option } from "../../../types/types";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function SelectorOption({id, data, removeOption, updateOption}: ISelectorOption) {
    return (
        <div className="flex items-center gap-2 mb-2">
            <input 
                type="text" 
                name={`text-${id}`} 
                id={`text-${id}`} 
                placeholder="Texte de l'option" 
                value={data.title} 
                onChange={(e) => {updateOption(id, {...data, title: e.target.value})}} 
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
            />
            <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                onClick={() => removeOption(id)}
                className="text-red-600 hover:bg-red-50 hover:text-red-700"
                title="Supprimer cette option"
            >
                <Trash2 size={16} />
            </Button>
        </div>
    );
}

interface ISelectorOption {
    id: number;
    data: Option;
    removeOption: (id: number) => void;
    updateOption: (id: number, option: Option) => void;
}
