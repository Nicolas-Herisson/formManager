import EditForm from "./editForm";
import ResponsePage from "./responsesPage";
import type { Form } from "@/types/types";

export default function Body({form, setForm, updateForm, addForm, selectedPage, selectedForm}: IBodyProps) {
    return (
        <div className="body w-full">
            {selectedPage === "edit" && (
                <EditForm form={form} setForm={setForm} updateForm={updateForm} addForm={addForm} />
            )}
            {selectedPage === "responses" && (
                <ResponsePage selectedForm={selectedForm} />
            )}
        </div>
    );
}

interface IBodyProps {
    form: Form;
    setForm: React.Dispatch<React.SetStateAction<Form>>;
    updateForm: (form: Form) => void;
    addForm: (form: Form) => void;
    selectedPage: string;
    selectedForm: Form;
}
