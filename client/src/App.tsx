import LeftPanel from "@/components/leftPanel"
import RightPanel from "@/components/rightPanel/rightPanel"
import type { Form } from "@/types/types";
import { useState, useEffect } from "react";
import { fetchGetForms, fetchCreateForm, fetchDeleteForm, fetchUpdateForm } from "@/services/requests";

function App() {

  const [showRightPanel, setShowRightPanel] = useState(false);
  const [forms, setForms] = useState<Form[]>([]);
  const [selectedForm, setSelectedForm] = useState<Form>({id: -1, title: '', description: '', questions: []});

  async function addForm(form: Form) {
    await fetchCreateForm(form);
    setForms([...forms, form]);
  }

  async function deleteForm(id: number) {
    await fetchDeleteForm(id);
    setForms((prevForms) => prevForms.filter((form) => form.id !== id));
  }

  async function updateForm(id: number, form: Form) {
    await fetchUpdateForm(id, form);
    setForms((prevForms) => prevForms.map((f) => f.id === id ? form : f));
  }

  useEffect(() => {
    async function fetchForms() {
        const fetchedForms = await fetchGetForms();
        if (fetchedForms.length > 0)
        {
            setForms(fetchedForms);
        }
    }
    fetchForms();
}, []);

  return (
    <div className="flex">
       <LeftPanel setShowRightPanel={setShowRightPanel} forms={forms} setSelectedForm={setSelectedForm} deleteForm={deleteForm}/>
      {showRightPanel && <RightPanel form={selectedForm} setForm={setSelectedForm} updateForm={updateForm} addForm={addForm}/>}
     
      {/* <Card className="dark">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card> */}
    </div>
  )
}

export default App
