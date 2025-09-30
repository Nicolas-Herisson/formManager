import { Button } from '@/components/ui/button/button';
import type { Form } from '@/types/types';
import HeaderBurger from '@/components/ui/headerBurger/headerBurger';

export default function Header({ selectedPage, setSelectedPage, selectedForm }: IHeaderProps) {
  return (
    <div className="header h-16 w-full border-b border-solid border-gray-200 bg-white shadow-sm">
      <nav className="h-full">
        <div className="flex h-full items-center justify-between px-6">
          <ul className="flex h-full items-center gap-1">
            {selectedForm && selectedForm.id > 0 && (
              <>
                <li>
                  <Button
                    variant={selectedPage === 'edit' ? 'secondary' : 'ghost'}
                    className={`${selectedPage === 'edit' ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => setSelectedPage('edit')}
                  >
                    Éditer
                  </Button>
                </li>
                <li>
                  <Button
                    variant={selectedPage === 'responses' ? 'secondary' : 'ghost'}
                    className={`${selectedPage === 'responses' ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => setSelectedPage('responses')}
                  >
                    Réponses
                  </Button>
                </li>
              </>
            )}
          </ul>

          <div className="flex items-center gap-1">
            <HeaderBurger setSelectedPage={setSelectedPage} />
          </div>
        </div>
      </nav>
    </div>
  );
}

interface IHeaderProps {
  selectedPage: string;
  setSelectedPage: (page: string) => void;
  selectedForm: Form | null;
}
