import clientAxios from '@/config/axios';
import axios from 'axios';
import { useState, createContext, ReactNode, FC, useEffect } from 'react';

interface AuthData {
  id: string;
  name: string;
  lastName: string;
  email: string;
  token: string;
  phoneNumber: string | null;
  webSite: string | null;
}

export interface AuthContextType {
  auth: AuthData | null;
  setAuth: React.Dispatch<React.SetStateAction<AuthData | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthData | null>(null);

  useEffect(() => {
    const authenticateUser = async () => {
      const token = localStorage.getItem('blog_app_token');

      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clientAxios('/users/admin/profile', config);
        setAuth(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          error.response?.data.message;
          setAuth(null);
        }
      }
    };
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
