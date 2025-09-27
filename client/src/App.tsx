import { Route, Routes } from 'react-router';
import { FormPage } from './pages/client/formPage';
import MainPage from './pages/admin/main';
import { Toaster } from 'sonner';
import Login from './pages/login';
import Register from './pages/register';

function App() {
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
          element={<MainPage />}
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
