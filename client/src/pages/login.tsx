import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button/button';
import type { Login } from '../types/types';
import { toast } from 'sonner';
import { fetchLogin } from '../services/authRequests';

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<Login>();

  const onSubmit = async (data: Login) => {
    const response = await fetchLogin(data);

    if (response?.message === 'Vous avez été connecté avec succès') {
      toast.success('Connexion reussie');
      navigate('/');
    } else {
      toast.error(response);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center gap-4">
      <form
        className="flex flex-col gap-4 rounded border border-gray-200 p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="self-center text-2xl font-bold">Connexion</h1>

        <label
          htmlFor="email"
          className="text-lg font-semibold"
        >
          Email
        </label>
        <input
          type="text"
          id="email"
          placeholder="Email"
          className="rounded border border-gray-200 p-2"
          {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
        />

        <label
          htmlFor="password"
          className="text-lg font-semibold"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="rounded border border-gray-200 p-2"
          {...register('password', {
            required: true,
            minLength: 8,
            maxLength: 20,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
          })}
        />

        <Button>Connexion</Button>
        <p className="text-center">
          Vous n'avez pas de compte ?{' '}
          <Button
            type="button"
            onClick={() => navigate('/register')}
          >
            S'inscrire
          </Button>
        </p>
      </form>
    </div>
  );
}
