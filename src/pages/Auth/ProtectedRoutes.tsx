import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { Spinner } from '@nextui-org/react';

const ProtectedRoute = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <Spinner label="Cargando..." color="secondary" />;
  }

  return auth?._id ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
