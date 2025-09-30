import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'sonner';
import type { ResetPassword } from '../types/types';
import { fetchResetPassword } from '../services/authRequests';
import { useNavigate, useParams } from 'react-router';
import { Button } from '@/components/ui/button/button';

export default function ResetPassword() {
  const navigate = useNavigate();
  const { id, isInvite } = useParams<{ id: string; isInvite: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<ResetPassword>({
    defaultValues: {
      id: id || '',
      password: '',
      confirmPassword: ''
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ResetPassword) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetchResetPassword(data.id, data.password, data.confirmPassword, isInvite === '0');

      if (response && response.status === 'success') {
        toast.success('Mot de passe réinitialisé avec succès');
        navigate('/login');
      } else {
        toast.error(response || 'Une erreur est survenue');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error('Erreur lors de la réinitialisation du mot de passe');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Réinitialisation du mot de passe</h2>
          <p className="mt-2 text-sm text-gray-600">Entrez votre nouveau mot de passe ci-dessous</p>
        </div>

        <div className="mt-8 bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="hidden"
              {...register('id')}
            />

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Nouveau mot de passe
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  className={`block w-full appearance-none border px-3 py-2 ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  } rounded-md placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm`}
                  {...register('password', {
                    required: 'Ce champ est requis',
                    minLength: {
                      value: 8,
                      message: 'Le mot de passe doit contenir au moins 8 caractères'
                    }
                  })}
                />
                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmer le mot de passe
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  className={`block w-full appearance-none border px-3 py-2 ${
                    errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  } rounded-md placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm`}
                  {...register('confirmPassword', {
                    required: 'Veuillez confirmer votre mot de passe',
                    validate: (value) => value === watch('password') || 'Les mots de passe ne correspondent pas'
                  })}
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              >
                {isSubmitting ? 'Traitement en cours...' : 'Réinitialiser le mot de passe'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
