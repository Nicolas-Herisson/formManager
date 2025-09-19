import { Plus, Copy, Trash2, CheckCircle2, XCircle, Power } from "lucide-react";
import { toast } from "sonner";
import type { Form } from "@/types/types";
import { Button } from "@/components/ui/button";
import { fetchPublishForm } from "@/services/formRequests";

export default function LeftPanel({ setShowRightPanel, forms, setSelectedForm, deleteForm, refetchForms }: ILeftPanelProps) {

    const handleCopyLink = async (formId: number) => {
        try {

            await navigator.clipboard.writeText(`http://localhost:5173/client/form/${formId}`);

            toast.success("Lien copié !", {
                description: "Le lien a été copié dans le presse-papier",
                duration: 3000,
                position: "bottom-right",
                style: {
                    background: "#f0fdf4",
                    color: "#166534",
                    border: "1px solid #bbf7d0",
                    borderRadius: "0.5rem",
                    padding: "0.75rem 1rem",
                    fontWeight: 500,
                },
                icon: <CheckCircle2 className="text-green-600" size={18} />,
            });
        } catch (error) {

            console.error('Erreur lors de la copie du lien:', error);

            toast.error("Erreur lors de la copie du lien", {
                description: "Veuillez réessayer",
                duration: 3000,
                position: "top-center",
                style: {
                    background: "#fef2f2",
                    color: "#991b1b",
                    border: "1px solid #fecaca",
                    borderRadius: "0.5rem",
                    padding: "0.75rem 1rem",
                    fontWeight: 500,
                },
                icon: <XCircle className="text-red-600" size={18} />,
            });
        }
    };

    const handleDeleteForm = async (formId: number, e: React.MouseEvent) => {
        e.stopPropagation();

        if (confirm('Êtes-vous sûr de vouloir supprimer ce formulaire ?')) {
            try {

                await deleteForm(formId);
                toast.success("Formulaire supprimé");

            } catch (error) {
                console.error('Erreur lors de la suppression du formulaire:', error);
                toast.error("Erreur lors de la suppression du formulaire");
            }
        }
    };

    const handlePublishForm = async (formId: number, e: React.MouseEvent, published: boolean) => {
        e.stopPropagation();

        if (confirm(published ? 'Êtes-vous sûr de vouloir desactiver ce formulaire ?' : 'Êtes-vous sûr de vouloir activer ce formulaire ?')) {
            try {

                const publishStatus = await fetchPublishForm(formId);
                toast.success(publishStatus.message);
                refetchForms();

            } catch (error) {
                console.error('Erreur lors de l\'activation du formulaire:', error);
                toast.error("Erreur lors de l'activation du formulaire");
            }
        }
    };

    return (
        <div className="w-80 h-screen flex flex-col border-r border-gray-200 bg-gray-50">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-gray-50 p-4 border-b border-gray-200">
                <h1 className="text-xl font-bold text-gray-800 mb-4">Mes Formulaires</h1>
                <Button 
                    onClick={() => {
                        setShowRightPanel(true); 
                        setSelectedForm({id: -Date.now(), title: 'Nouveau formulaire', description: '', is_published: false, questions: []});
                    }}
                    className="w-full flex items-center justify-center gap-2"
                >
                    <Plus size={16} />
                    Nouveau formulaire
                </Button>
            </div>

            {/* List of forms */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {forms.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Aucun formulaire pour le moment</p>
                ) : (
                    forms.map((form) => (
                        <div 
                            key={form.id} 
                            className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors"
                            onClick={() => {
                                setSelectedForm(form);
                                setShowRightPanel(true);
                            }}
                        >
                            <div className="flex flex-col justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-900">{form.title}</h3>
                                    {form.description && (
                                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{form.description}</p>
                                    )}
                                </div>
                                
                                <div className="flex self-center gap-2 mt-2">
                                    <Button 
                                        variant="ghost" 
                                        size="icon"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCopyLink(form.id);
                                        }}
                                        className="text-blue-600 hover:bg-blue-50"
                                        title="Copier le lien"
                                    >
                                        <Copy size={16} />
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        size="icon"
                                        onClick={(e) => handlePublishForm(form.id, e, form.is_published)}
                                        className={form.is_published ? 'text-green-600 hover:bg-green-50' : 'text-gray-600 hover:bg-gray-50'}
                                        title={form.is_published ? 'Ne pas publier' : 'Publier'}
                                    >
                                        <Power size={16} />
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        size="icon"
                                        onClick={(e) => handleDeleteForm(form.id, e)}
                                        className="text-red-600 hover:bg-red-50"
                                        title="Supprimer"
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

interface ILeftPanelProps {
    setShowRightPanel: (show: boolean) => void;
    forms: Form[];
    setSelectedForm: (form: Form) => void;
    deleteForm: (id: number) => Promise<void>;
    refetchForms: () => Promise<void>;
}