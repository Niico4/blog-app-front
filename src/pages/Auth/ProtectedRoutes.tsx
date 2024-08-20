import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { Spinner } from '@nextui-org/react';

const ProtectedRoute = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <Spinner label="Cargando..." color="secondary" />;
  }

  if (!auth?._id) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
