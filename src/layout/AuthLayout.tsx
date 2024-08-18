import { userPaths } from '@/constants/routerPaths';
import useAuth from '@/hooks/useAuth';
import { Spinner } from '@nextui-org/react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  const { auth, loading } = useAuth();
  return (
    <>
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner label="Cargando datos..." color="secondary" size="lg" />
        </div>
      )}
      <div className="bg-custom-gradient h-screen flex justify-center items-center">
        {auth?._id ? (
          <Navigate to={`/${userPaths.root}/${userPaths.home}`} />
        ) : (
          <Outlet />
        )}
      </div>
    </>
  );
};

export default AuthLayout;
