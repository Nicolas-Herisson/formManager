import { useEffect } from 'react';
import { fetchGetRoles } from '@/services/userRequests';
import { useState } from 'react';
import { Role } from '@/types/types';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button/button';
import { toast } from 'sonner';
import { InviteUser } from '@/types/types';
import { fetchGetInvites, fetchDeleteInvite, fetchInviteUser } from '@/services/inviteRequests';
import { Invite } from '@/types/types';
import { DeleteInvite } from '@/types/types';

export default function AdminDashboard() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [invites, setInvites] = useState<Invite[]>([]);
  const { register: registerInvite, handleSubmit: handleSubmitInvite, reset: resetInvite } = useForm<InviteUser>();
  const {
    register: registerDeleteInvite,
    handleSubmit: handleSubmitDeleteInvite,
    reset: resetDeleteInvite
  } = useForm<DeleteInvite>();

  const fetchInvites = async () => {
    try {
      const { invites } = await fetchGetInvites();
      setInvites(invites);
    } catch (error) {
      console.error('loadInvites error:', error);
      toast.error('Erreur lors du chargement des invitations');
    }
  };

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
    fetchInvites();
  }, []);

  const handleInviteSubmit = async (data: InviteUser) => {
    try {
      const response = await fetchInviteUser(data.email, data.name, data.role_id);

      if (response.status === 'success') {
        await fetchInvites();

        toast.success(response.message);

        resetInvite();
      } else {
        toast.error(response);
      }
    } catch (error) {
      console.error('sendInvite error:', error);
      toast.error("Erreur lors de l'envoi de l'invitation");
    }
  };

  const handleDeleteInviteSubmit = async (data: DeleteInvite) => {
    try {
      const response = await fetchDeleteInvite(data.invite_id);

      if (response.status === 'success') {
        await fetchInvites();

        toast.success(response.message);
        resetDeleteInvite();
      } else {
        toast.error(response);
      }
    } catch (error) {
      console.error('deleteInvite error:', error);
      toast.error("Erreur lors de la suppression de l'invitation");
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
          onSubmit={handleSubmitInvite(handleInviteSubmit)}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Nom *
            </label>
            <input
              id="name"
              type="text"
              required
              {...registerInvite('name')}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Nom"
            />
          </div>

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
              {...registerInvite('email')}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="email@exemple.com"
            />
          </div>

          <div>
            <label
              htmlFor="role_id"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Rôle *
            </label>
            <div className="rounded-lg border bg-white">
              <select
                id="role_id"
                required
                {...registerInvite('role_id')}
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
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              Envoyer l'invitation
            </Button>
          </div>
        </form>
      </div>
      <div className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
        <form
          onSubmit={handleSubmitDeleteInvite(handleDeleteInviteSubmit)}
          className="space-y-6"
        >
          <h2 className="mb-6 text-xl font-semibold text-gray-800">Supprimer une invitation</h2>
          <div className="rounded-lg border bg-white">
            <select
              id="invite_id"
              required
              {...registerDeleteInvite('invite_id')}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pr-10 pl-3 text-base focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
              defaultValue=""
            >
              <option
                value=""
                disabled
              >
                Sélectionner une invitation
              </option>
              {invites.map((invite) => (
                <option
                  key={invite.id}
                  value={invite.id}
                >
                  {invite.receiver.name + ' | ' + invite.receiver.email}
                </option>
              ))}
            </select>
          </div>
          <Button
            type="submit"
            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            Supprimer l'invitation
          </Button>
        </form>
      </div>
    </div>
  );
}
