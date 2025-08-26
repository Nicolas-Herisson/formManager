import { Button } from "@/components/ui/button";
import Question from "./form/question";
import type { Question as QuestionType } from "../../types/types";
import { fetchGetForm } from "../../services/formRequests";
import type { Form } from "@/types/types";
import { Plus, Save } from "lucide-react";
import { toast } from "sonner";

export default function EditForm({ form, setForm, updateForm, addForm }: IEditFormProps) {

    function addQuestion() {
        setForm({
            ...form,
            questions: [
                ...form.questions,
                {
                    id: -Date.now(),
                    title: '',
                    required: false,
                    selector: 'checkbox',
                    options: [{ id: -Date.now(), title: '', checked: false }]
                }
            ]
        });
        // Scroll to new question
        setTimeout(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
    }

    function removeQuestion(id: number) {

        setForm({...form, questions: form.questions.filter((q) => q.id !== id)});
        toast.success("Question supprimée");
    };

    function updateQuestion(id: number, question: QuestionType) {
        setForm({...form, questions: form.questions.map((q) => q.id === id ? question : q)});
    };
    
    async function handleSubmit(formData: FormData) {

        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const newForm = { id: form.id, title, description, questions: form.questions };
        
        if (!title.trim()) {
            toast.error('Le titre est obligatoire');
            return;
        }
        if (!form.questions.length) {
            toast.error('Ajoutez au moins une question');
            return;
        }

        const oldForm = await fetchGetForm(form.id);
        const loadingToast = toast.loading('Enregistrement en cours...');

        try {
            if (oldForm) {

                await updateForm(newForm);
                toast.success('Formulaire mis à jour avec succès', { id: loadingToast });

            } else {

                await addForm(newForm);
                toast.success('Formulaire créé avec succès', { id: loadingToast });
            }
        } catch (error) {
            
            toast.error('Erreur lors de l\'enregistrement', { id: loadingToast });
            console.error(error);
        }
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(new FormData(e.target as HTMLFormElement));
            }}>
                <div className="space-y-8">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">
                            {form.id < 0 ? 'Nouveau formulaire' : 'Modifier le formulaire'}
                        </h1>
                        
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                    Titre du formulaire *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Ex: Sondage de satisfaction"
                                    value={form.title}
                                    onChange={(e) => setForm({...form, title: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder="Décrivez l'objectif de ce formulaire"
                                    value={form.description}
                                    onChange={(e) => setForm({...form, description: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px] text-base"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Questions */}
                    <div className="space-y-6">

                        {form.questions.length > 0 ? (
                            <div className="space-y-6">
                                {form.questions.map((question, index) => (
                                    <div key={question.id} className="bg-white">
                                        <Question 
                                            id={question.id} 
                                            data={question} 
                                            removeQuestion={removeQuestion} 
                                            updateQuestion={updateQuestion} 
                                            questionNumber={index + 1}
                                        />
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    onClick={addQuestion}
                                    className="flex items-center gap-2 w-full justify-center"
                                >
                                    <Plus size={16} />
                                    Ajouter une question
                                </Button>
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                                <p className="text-gray-500 mb-4">Aucune question pour le moment</p>
                                <Button
                                    type="button"
                                    onClick={addQuestion}
                                    className="flex items-center gap-2 mx-auto"
                                >
                                    <Plus size={16} />
                                    Ajouter votre première question
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* buttons */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <Button 
                            type="button"
                            onClick={addQuestion}
                            className="flex items-center gap-2 px-4 py-2"
                        >
                            <Plus size={16} />
                            Ajouter une question
                        </Button>
                        <Button 
                            type="submit" 
                            className="flex items-center gap-2 px-4 py-2"
                        >
                            <Save size={16} />
                            Enregistrer le formulaire
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

interface IEditFormProps {
    form: Form;
    setForm: React.Dispatch<React.SetStateAction<Form>>;
    updateForm: (form: Form) => void;
    addForm: (form: Form) => void;
}
