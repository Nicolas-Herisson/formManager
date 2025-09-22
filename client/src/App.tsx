import { Route, Routes } from 'react-router';
import { FormPage } from './pages/client/formPage';
import MainPage from './pages/admin/main';
import { Toaster } from 'sonner';
import Auth from './pages/auth';
import Login from './pages/login';
import Register from './pages/register';
import { useState } from 'react';
import type { User } from './types/types';

function App() {
  const [user, setUser] = useState<User | null>(null);


  return (
    <>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login setUser={setUser}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MainPage user={user}/>} />
        <Route path="/client/form/:id" element={<FormPage />} />
      </Routes>
    </>
  );
}

export default App;
