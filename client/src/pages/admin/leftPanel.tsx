import { Plus, Copy, Trash2, CheckCircle2, XCircle, Power } from 'lucide-react';
import { toast } from 'sonner';
import type { Form } from '@/types/types';
import { Button } from '@/components/ui/button/button';
import { fetchLogout } from '@/services/authRequests';
import { fetchPublishForm } from '@/services/formRequests';
import { useNavigate } from 'react-router';
import { fetchCreateResponse } from '@/services/responseRequests';

export default function LeftPanel({ forms, setSelectedForm, deleteForm, refetchForms }: ILeftPanelProps) {
  const navigate = useNavigate();

  const handleCopyLink = async (formId: number) => {
    try {
      const { path } = await fetchCreateResponse({ form_id: formId });
      await navigator.clipboard.writeText(path);

      toast.success('Lien copié !', {
        description: 'Le lien a été copié dans le presse-papier',
        duration: 3000,
        position: 'bottom-right',
        style: {
          background: '#f0fdf4',
          color: '#166534',
          border: '1px solid #bbf7d0',
          borderRadius: '0.5rem',
          padding: '0.75rem 1rem',
          fontWeight: 500
        },
        icon: (
          <CheckCircle2
            className="text-green-600"
            size={18}
          />
        )
      });
    } catch (error) {
      console.error('Erreur lors de la copie du lien:', error);

      toast.error('Erreur lors de la copie du lien', {
        description: 'Veuillez réessayer',
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#fef2f2',
          color: '#991b1b',
          border: '1px solid #fecaca',
          borderRadius: '0.5rem',
          padding: '0.75rem 1rem',
          fontWeight: 500
        },
        icon: (
          <XCircle
            className="text-red-600"
            size={18}
          />
        )
      });
    }
  };

  const handleDeleteForm = async (formId: number, e: React.MouseEvent) => {
    e.stopPropagation();

    if (confirm('Êtes-vous sûr de vouloir supprimer ce formulaire ?')) {
      try {
        await deleteForm(formId);

        toast.success('Formulaire supprimé');
      } catch (error) {
        console.error('Erreur lors de la suppression du formulaire:', error);
        toast.error('Erreur lors de la suppression du formulaire');
      }
    }
  };

  const handlePublishForm = async (formId: number, e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const publishStatus = await fetchPublishForm(formId);

      toast.success(publishStatus.message);

      refetchForms();
    } catch (error) {
      console.error("Erreur lors de l'activation du formulaire:", error);
      toast.error("Erreur lors de l'activation du formulaire");
    }
  };

  async function logout() {
    await fetchLogout();

    navigate('/login');
  }

  return (
    <div className="flex h-screen w-80 flex-col border-r border-gray-200 bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-gray-200 bg-gray-50 p-4">
        <h1 className="mb-4 text-xl font-bold text-gray-800">Mes Formulaires</h1>

        <Button
          onClick={() => {
            setSelectedForm({
              id: -Date.now(),
              title: 'Nouveau formulaire',
              description: '',
              is_published: false,
              questions: []
            });
          }}
          className="flex w-full items-center justify-center gap-2"
        >
          <Plus size={16} />
          Nouveau formulaire
        </Button>
      </div>

      {/* List of forms */}
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {forms.length === 0 ? (
          <p className="py-8 text-center text-gray-500">Aucun formulaire pour le moment</p>
        ) : (
          forms.map((form) => (
            <div
              key={form.id}
              className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-blue-300"
              onClick={() => {
                setSelectedForm(form);
              }}
            >
              <div className="flex flex-col items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{form.title}</h3>
                  {form.description && <p className="mt-1 line-clamp-2 text-sm text-gray-500">{form.description}</p>}
                </div>

                <div className="mt-2 flex gap-2 self-center">
                  {form.is_published && (
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
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handlePublishForm(form.id, e)}
                    className={
                      form.is_published ? 'text-green-600 hover:bg-green-50' : 'text-gray-600 hover:bg-gray-50'
                    }
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

      <Button
        className="sticky"
        onClick={logout}
      >
        Se deconnecter
      </Button>
    </div>
  );
}

interface ILeftPanelProps {
  forms: Form[];
  setSelectedForm: (form: Form) => void;
  deleteForm: (id: number) => Promise<void>;
  refetchForms: () => Promise<void>;
}
