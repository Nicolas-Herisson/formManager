import { fetchGetMe } from '../services/userRequests';
import { useState, useEffect, useCallback } from 'react';
import { fetchLogout } from '../services/authRequests';
import type { getMe } from '../types/types';
import { UserContext } from '../contexts/user.context';

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<getMe | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      isAuth();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const isAuth = useCallback(async () => {
    try {
      const userData = await fetchGetMe();

      if (userData.status === 'success') {
        const user = {
          id: userData.id,
          role_id: userData.role_id
        };
        setUser(user);
      }
      setIsLoading(false);
    } catch (error) {
      setUser(null);
      console.error(error);
      setIsLoading(false);
    }
  }, []);

  const logout = async () => {
    const response = await fetchLogout();

    if (response) {
      setUser(null);
      setIsLoading(true);
    }
  };

  const getUser = () => {
    return user;
  };

  return <UserContext.Provider value={{ user, setUser, logout, getUser, isLoading }}>{children}</UserContext.Provider>;
};
