import { Route, Routes } from 'react-router';
import { FormPage } from './pages/client/formPage';
import MainPage from './pages/admin/main';
import { Toaster } from 'sonner';
import Login from './pages/login';
import Register from './pages/register';
import { useEffect, useState } from 'react';
import { fetchGetMe } from './services/userRequests';
import type { User } from './types/types';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchGetMe();

      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: 'cursor-pointer'
        }}
      />
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/"
          element={<MainPage user={user} />}
        />
        <Route
          path="/client/form/:id/:token"
          element={<FormPage />}
        />
      </Routes>
    </>
  );
}

export default App;
