import { createContext, useContext } from 'react';
import type { User } from '../types/types';

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logout: () => Promise.resolve()
});

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserContextProvider');
  }

  return context;
}
