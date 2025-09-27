import { fetchGetMe } from '../services/userRequests';
import { useState, useEffect } from 'react';
import { fetchLogout } from '../services/authRequests';
import type { User } from '../types/types';
import { UserContext } from '../contexts/user.context';

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await fetchGetMe();

        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        setUser(null);
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const logout = async () => {
    const response = await fetchLogout();

    if (response) {
      setUser(null);
    }
  };

  return <UserContext.Provider value={{ user, setUser, logout }}>{children}</UserContext.Provider>;
};
