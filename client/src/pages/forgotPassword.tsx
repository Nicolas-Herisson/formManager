import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button/button';
import type { ForgotPassword } from '@/types/types';
import { fetchForgotPassword } from '@/services/authRequests';
import { toast } from 'sonner';
import { useState } from 'react';

export default function ForgotPassword() {
  const { register, handleSubmit } = useForm<ForgotPassword>();
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: ForgotPassword) => {
    const response = await fetchForgotPassword(data.email);

    if (response.status === 'success') {
      setIsSuccess(true);
      toast.success(response.message);
    } else {
      toast.error(response.error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center gap-4">
      <form
        className="flex w-80 flex-col gap-4 rounded border border-gray-200 p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="self-center text-2xl font-bold">Mot de passe oublié</h1>

        {isSuccess ? (
          <p className="text-center text-green-500">Un email vous a été envoyé</p>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-lg font-semibold"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="rounded border border-gray-300 p-2"
                placeholder="votre@email.com"
                {...register('email')}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
            >
              Envoyer
            </Button>
          </>
        )}
      </form>
    </div>
  );
}
