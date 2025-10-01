import EditForm from './editForm';
import ResponsePage from './responsesPage';
import type { Form } from '@/types/types';
import AdminDashboard from '../admin/adminDashboard';

export default function Body({ form, setForm, updateForm, addForm, selectedPage, selectedForm }: IBodyProps) {
  if (selectedPage === 'admin') {
    return <AdminDashboard />;
  }

  if (!selectedForm) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-medium text-gray-900">Aucun formulaire sélectionné</h2>
          <p className="mt-1 text-gray-500">Sélectionnez ou créez un formulaire pour commencer</p>
        </div>
      </div>
    );
  }

  return (
    <div className="body w-full">
      {selectedPage === 'edit' ? (
        <EditForm
          form={form}
          setForm={setForm}
          updateForm={updateForm}
          addForm={addForm}
        />
      ) : selectedPage === 'responses' ? (
        <ResponsePage selectedForm={selectedForm} />
      ) : null}
    </div>
  );
}

interface IBodyProps {
  form: Form;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
  updateForm: (form: Form) => void;
  addForm: (form: Form) => void;
  selectedPage: string;
  selectedForm: Form | null;
}
