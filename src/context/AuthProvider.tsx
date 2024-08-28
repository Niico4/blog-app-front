import clientAxios from '@/config/axios';
import { userPaths } from '@/constants/routerPaths';
import useAlert from '@/hooks/useAlert';
import axios from 'axios';
import { createContext, FC, ReactNode, useEffect, useState } from 'react';

interface AuthData {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  token: string;
  phoneNumber: string | null;
  webSite: string | null;
}
interface UserChangePassword {
  currentPassword: string;
  newPassword: string;
}

export interface AuthContextType {
  auth: AuthData | null;
  setAuth: React.Dispatch<React.SetStateAction<AuthData | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  updateProfile: (dataUpdated: UserUpdate) => void;
  signOut: () => void;
  saveNewPassword: (dataUser: UserChangePassword) => void;
}

type UserUpdate = Omit<AuthData, 'token'>;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthData | null>(null);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();

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

  const updateProfile = async (dataUpdated: UserUpdate) => {
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
      const url = `users/${userPaths.root}/${userPaths.profile}/${dataUpdated._id}`;
      const { data } = await clientAxios.put(url, dataUpdated, config);

      return showAlert(data.message, false);
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        return showAlert(error.response?.data.message, true);
      }
    }
  };

  const signOut = () => {
    localStorage.removeItem('blog_app_token');
    setAuth(null);
  };

  const saveNewPassword = async (dataUser: UserChangePassword) => {
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
      const url = `users/${userPaths.root}/${userPaths.changePassword}`;
      const { data } = await clientAxios.put(url, dataUser, config);
      return showAlert(data.message, false);
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        return showAlert(error.response?.data.message, true);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        setLoading,
        updateProfile,
        signOut,
        saveNewPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
