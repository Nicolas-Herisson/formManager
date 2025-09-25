import LeftPanel from './leftPanel';
import RightPanel from './rightPanel/rightPanel';
import type { Form } from '@/types/types';
import { useState, useEffect, useCallback } from 'react';
import { fetchGetForms, fetchCreateForm, fetchDeleteForm, fetchUpdateForm } from '@/services/formRequests';
import { useNavigate } from 'react-router';
import type { User } from '@/types/types';

function MainPage({ user }: { user: User | null }) {
  const navigate = useNavigate();
  const [showRightPanel, setShowRightPanel] = useState(false);
  const [forms, setForms] = useState<Form[]>([]);
  const [selectedForm, setSelectedForm] = useState<Form>({
    id: -Date.now(),
    title: '',
    description: '',
    is_published: false,
    questions: []
  });

  async function addForm(form: Form) {
    await fetchCreateForm(form);
    setForms(await fetchGetForms());
  }

  async function deleteForm(id: number) {
    await fetchDeleteForm(id);
    setForms(await fetchGetForms());
    if (selectedForm.id === id || forms.length === 0)
      setSelectedForm({ id: -Date.now(), title: '', description: '', is_published: false, questions: [] });
  }

  async function updateForm(form: Form) {
    await fetchUpdateForm(form);
    setForms(await fetchGetForms());
  }

  const fetchForms = useCallback(async () => {
    const fetchedForms = await fetchGetForms();

    if (fetchedForms.length > 0) setForms(fetchedForms);
  }, []);

  useEffect(() => {
    if (!user) navigate('/login');
    fetchForms();
  }, [fetchForms, navigate, user]);

  return (
    <div className="flex">
      {user && (
        <>
          <LeftPanel
            setShowRightPanel={setShowRightPanel}
            forms={forms}
            setSelectedForm={setSelectedForm}
            deleteForm={deleteForm}
            refetchForms={fetchForms}
          />
          {showRightPanel && (
            <RightPanel
              form={selectedForm}
              setForm={setSelectedForm}
              updateForm={updateForm}
              addForm={addForm}
              selectedForm={selectedForm}
            />
          )}
        </>
      )}
    </div>
  );
}

export default MainPage;
