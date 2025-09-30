import { Button } from '@/components/ui/button/button';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import HeaderModal from './headerModal';

export default function HeaderBurger({ setSelectedPage }: IHeaderBurgerProps) {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="text-gray-600 hover:bg-gray-50"
        onClick={toggleMenu}
      >
        <Menu />
      </Button>

      {open && (
        <div className="absolute top-8 right-0 z-10 w-48">
          <HeaderModal setSelectedPage={setSelectedPage} />
        </div>
      )}
    </div>
  );
}

interface IHeaderBurgerProps {
  setSelectedPage: (page: string) => void;
}
