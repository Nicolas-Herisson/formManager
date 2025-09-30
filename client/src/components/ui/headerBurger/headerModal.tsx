import { Button } from '@/components/ui/button/button';
import { useUser } from '@/contexts/user.context';

export default function HeaderModal({ setSelectedPage }: IHeaderModalProps) {
  const { user, logout } = useUser();

  return (
    <div className="flex flex-col rounded-md border border-gray-200 bg-white shadow-sm">
      {user?.role_id === 1 && (
        <Button
          variant="ghost"
          className="border-b border-gray-200"
          onClick={() => setSelectedPage('admin')}
        >
          Dashboard
        </Button>
      )}
      <Button
        variant="ghost"
        onClick={() => logout()}
      >
        Déconnexion
      </Button>
    </div>
  );
}

interface IHeaderModalProps {
  setSelectedPage: (page: string) => void;
}
