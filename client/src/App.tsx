import { Route, Routes } from 'react-router';
import { FormPage } from './pages/client/formPage';
import MainPage from './pages/admin/main';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/client/form/:id" element={<FormPage />} />
      </Routes>
    </>
  );
}

export default App;
