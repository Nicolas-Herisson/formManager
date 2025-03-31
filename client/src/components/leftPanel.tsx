import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Form } from "@/types/types";

export default function LeftPanel({setShowRightPanel, forms, setSelectedForm, deleteForm} : ILeftPanelProps) {

    return (
        <div className="left-panel w-1/8 h-screen overflow-hidden border-r border-solid border-gray-300 p-4 flex flex-col items-center">
            <Button onClick={() => {setShowRightPanel(true); setSelectedForm({id: forms.length + 1, title: '', description: '', questions: []})}} className="mx-auto">Create form</Button>
            {forms && forms.length > 0 &&
                forms.map((form) => (
                    <Card className="dark" key={form.id} 
                    onMouseEnter={() => {setShowRightPanel(true); setSelectedForm(form)}}>
                        <CardHeader>
                            <CardTitle>{form.title}</CardTitle>
                            <CardDescription>{form.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button onClick={async () => await deleteForm(form.id)}>X</Button>
                        </CardContent>
                        <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter>
                    </Card>
                ))
            }
        </div>
    );
}

interface ILeftPanelProps {
    forms: Form[];
    setShowRightPanel: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedForm: React.Dispatch<React.SetStateAction<Form>>;
    deleteForm: (id: number) => void;
}