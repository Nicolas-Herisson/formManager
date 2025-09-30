import { Route, Routes } from 'react-router';
import { FormPage } from './pages/client/formPage';
import MainPage from './pages/admin/main';
import { Toaster } from 'sonner';
import Login from './pages/login';
import Register from './pages/register';
import AdminDashboard from './pages/admin/adminDashboard';
import ResetPassword from './pages/resetPassword';
import ForgotPassword from './pages/forgotPassword';

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
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />
        <Route
          path="/:isInvite/reset-password/:id"
          element={<ResetPassword />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
      </Routes>
    </>
  );
}

export default App;
