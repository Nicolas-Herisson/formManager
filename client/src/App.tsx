import { Route, Routes } from 'react-router';
import { FormPage } from './pages/client/formPage';
import MainPage from './pages/admin/main';
import { Toaster } from 'sonner';
import Auth from './pages/auth';
import Login from './pages/login';
import Register from './pages/register';
import { useEffect, useState } from 'react';
import { fetchGetMe } from './services/userRequests';

function App() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
      const fetchUser = async () => {
          const userId = await fetchGetMe();
          setUser(userId);
      }
      fetchUser();
  }, []);

  return (
    <>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MainPage user={user}/>} />
        <Route path="/client/form/:id" element={<FormPage />} />
      </Routes>
    </>
  );
}

export default App;
