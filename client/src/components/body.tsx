import EditForm from "./editForm";
import type { Form } from "@/types/types";

export default function Body({form, setForm, updateForm, addForm}: IBodyProps) {
    return (
        <div className="body w-full">
            <EditForm form={form} setForm={setForm} updateForm={updateForm} addForm={addForm} />
        </div>
    );
}

interface IBodyProps {
    form: Form;
    setForm: React.Dispatch<React.SetStateAction<Form>>;
    updateForm: (id: number, form: Form) => void;
    addForm: (form: Form) => void;
}
