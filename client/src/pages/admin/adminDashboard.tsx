import { useEffect } from 'react';
import { fetchGetRoles } from '@/services/userRequests';
import { useState } from 'react';
import { Role } from '@/types/types';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button/button';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const [roles, setRoles] = useState<Role[]>([]);
  const { register, handleSubmit, setValue } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const { roles } = await fetchGetRoles();
        setRoles(roles);
      } catch (error) {
        console.error('loadRoles error:', error);
        toast.error('Erreur lors du chargement des rôles');
      }
    };
    fetchRoles();
  }, []);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    const loadingToast = toast.loading("Envoi de l'invitation en cours...");

    try {
      console.log("Données d'invitation:", data);

      toast.success('Invitation envoyée avec succès', { id: loadingToast });

      setValue('email', '');
      setValue('role', '');
    } catch (error) {
      console.error('sendInvite error:', error);
      toast.error("Erreur lors de l'envoi de l'invitation", { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Dashboard administrateur</h1>
        <p className="text-gray-600">Gérez les utilisateurs et les paramètres de l'application</p>
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-800">Inviter un utilisateur</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Adresse email *
            </label>
            <input
              id="email"
              type="email"
              required
              {...register('email')}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="email@exemple.com"
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Rôle *
            </label>
            <select
              id="role"
              required
              {...register('role')}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pr-10 pl-3 text-base focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
              defaultValue=""
            >
              <option
                value=""
                disabled
              >
                Sélectionner un rôle
              </option>
              {roles.map((role) => (
                <option
                  key={role.id}
                  value={role.id}
                >
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              {isSubmitting ? 'Envoi en cours...' : "Envoyer l'invitation"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
