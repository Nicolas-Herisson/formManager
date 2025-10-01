import { Button } from '@/components/ui/button/button';
import Question from './form/question';
import type { Question as QuestionType } from '../../types/types';
import type { Form } from '@/types/types';
import { Plus, Save } from 'lucide-react';
import { toast } from 'sonner';

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
  }

  function removeQuestion(id: number) {
    setForm({ ...form, questions: form.questions.filter((q) => q.id !== id) });
    toast.success('Question supprimée');
  }

  function updateQuestion(id: number, question: QuestionType) {
    setForm({ ...form, questions: form.questions.map((q) => (q.id === id ? question : q)) });
  }

  async function handleSubmit(formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const newForm = { id: form.id, title, description, is_published: form.is_published, questions: form.questions };

    if (!title.trim()) {
      toast.error('Le titre est obligatoire');
      return;
    }
    if (!form.questions.length) {
      toast.error('Ajoutez au moins une question');
      return;
    }

    const loadingToast = toast.loading('Enregistrement en cours...');

    if (form.id > 0) {
      try {
        await updateForm(newForm);

        toast.success('Formulaire mis à jour avec succès', { id: loadingToast });
      } catch (error) {
        toast.error('Erreur lors de la mise à jour du formulaire', { id: loadingToast });
        console.error(error);
      }
    } else {
      try {
        await addForm(newForm);

        toast.success('Formulaire créé avec succès', { id: loadingToast });
      } catch (error) {
        toast.error('Erreur lors de la création du formulaire', { id: loadingToast });
        console.error(error);
      }
    }
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(new FormData(e.target as HTMLFormElement));
        }}
      >
        <div className="space-y-8">
          {/* Header */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h1 className="mb-6 text-2xl font-bold text-gray-900">
              {form.id < 0 ? 'Nouveau formulaire' : 'Modifier le formulaire'}
            </h1>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Titre du formulaire *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Ex: Sondage de satisfaction"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Décrivez l'objectif de ce formulaire"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="min-h-[100px] w-full rounded-md border border-gray-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {form.questions.length > 0 ? (
              <div className="space-y-6">
                {form.questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="bg-white"
                  >
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
                  className="flex w-full items-center justify-center gap-2"
                >
                  <Plus size={16} />
                  Ajouter une question
                </Button>
              </div>
            ) : (
              <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-12 text-center">
                <p className="mb-4 text-gray-500">Aucune question pour le moment</p>

                <Button
                  type="button"
                  onClick={addQuestion}
                  className="mx-auto flex items-center gap-2"
                >
                  <Plus size={16} />
                  Ajouter votre première question
                </Button>
              </div>
            )}
          </div>

          {/* buttons */}
          <div className="flex justify-end border-t border-gray-200 pt-4">
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
