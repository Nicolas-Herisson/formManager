import Header from "@/components/header/header";
import Body from "@/components/body";
import type { Form } from "@/types/types";

export default function RightPanel({form, setForm, updateForm, addForm}: IRightPanelProps) {
    return (
        <div className="right-panel w-7/8 h-screen overflow-y-auto">
            <Header />
            <Body form={form} setForm={setForm} updateForm={updateForm} addForm={addForm} />
        </div>
    );
}

interface IRightPanelProps {
    form: Form;
    setForm: React.Dispatch<React.SetStateAction<Form>>;
    updateForm: (id: number, form: Form) => void;
    addForm: (form: Form) => void;
}