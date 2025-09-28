import { fetchGetMe } from '../services/userRequests';
import { useState, useEffect } from 'react';
import { fetchLogout } from '../services/authRequests';
import type { User } from '../types/types';
import { UserContext } from '../contexts/user.context';

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.log('UserContextProvider');
    try {
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
    } catch (error) {
      console.error(error);
    }
  }, []);

  const logout = async () => {
    const response = await fetchLogout();

    if (response) {
      setUser(null);
    }
  };

  const getUser = () => {
    return user;
  };

  return <UserContext.Provider value={{ user, setUser, logout, getUser }}>{children}</UserContext.Provider>;
};
