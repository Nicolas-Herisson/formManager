import Body from '../body';
import { useState } from 'react';
import type { Form } from '@/types/types';
import Header from '../header/header';

export default function RightPanel({ form, setForm, updateForm, addForm, selectedForm }: IRightPanelProps) {
  const [selectedPage, setSelectedPage] = useState<string>('edit');

  return (
    <>
      <div className="right-panel h-screen w-7/8 overflow-y-auto">
        <Header
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          selectedForm={selectedForm}
        />
        <Body
          form={form}
          setForm={setForm}
          updateForm={updateForm}
          addForm={addForm}
          selectedPage={selectedPage}
          selectedForm={selectedForm}
        />
      </div>
    </>
  );
}

interface IRightPanelProps {
  form: Form;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
  updateForm: (form: Form) => void;
  addForm: (form: Form) => void;
  selectedForm: Form | null;
}
