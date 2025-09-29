import LeftPanel from './leftPanel';
import RightPanel from './rightPanel/rightPanel';
import type { Form } from '@/types/types';
import { useState, useEffect, useCallback } from 'react';
import { fetchGetForms, fetchCreateForm, fetchDeleteForm, fetchUpdateForm } from '@/services/formRequests';
import { useNavigate } from 'react-router';
import { useUser } from '@/contexts/user.context';

function MainPage() {
  const navigate = useNavigate();
  const [forms, setForms] = useState<Form[]>([]);
  const [selectedForm, setSelectedForm] = useState<Form>({
    id: -Date.now(),
    title: '',
    description: '',
    is_published: false,
    questions: []
  });

  const { user, isLoading } = useUser();

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
    if (!user && !isLoading) navigate('/login');
    fetchForms();
  }, [fetchForms, navigate, user, isLoading]);

  return (
    <div className="flex">
      {user && (
        <>
          <LeftPanel
            forms={forms}
            setSelectedForm={setSelectedForm}
            deleteForm={deleteForm}
            refetchForms={fetchForms}
          />

          <RightPanel
            form={selectedForm}
            setForm={setSelectedForm}
            updateForm={updateForm}
            addForm={addForm}
            selectedForm={selectedForm}
          />
        </>
      )}
    </div>
  );
}

export default MainPage;
