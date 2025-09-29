import { createContext, useContext } from 'react';
import type { getMe } from '../types/types';

type UserContextType = {
  user: getMe | null;
  setUser: (user: getMe | null) => void;
  logout: () => Promise<void>;
  getUser: () => getMe | null;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logout: () => Promise.resolve(),
  getUser: () => null,
  isLoading: false
});

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserContextProvider');
  }

  return context;
}
