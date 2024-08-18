import clientAxios from '@/config/axios';
import { userPaths } from '@/constants/routerPaths';
import axios from 'axios';
import { useState, createContext, ReactNode, FC, useEffect } from 'react';

interface AuthData {
  _id: string;
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
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticateUser = async () => {
      const token = localStorage.getItem('blog_app_token');

      if (!token) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clientAxios(
          `/users/${userPaths.root}/${userPaths.profile}`,
          config
        );
        setAuth({ ...data, token });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          error.response?.data.message;
          setAuth(null);
        }
      } finally {
        setLoading(false);
      }
    };
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
