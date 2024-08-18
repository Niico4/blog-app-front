import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { userPaths, authPaths } from '@/constants/routerPaths';
import AuthLayout from '@/layout/AuthLayout';
import { AuthProvider } from '@/context/AuthProvider';
import AppLayout from '@/layout/AppLayout';
import { authRoutes, userRoutes } from '@/routes/index.routes';
import useAuth from '@/hooks/useAuth';
import { Spinner } from '@nextui-org/react';
import { ProtectedRoute } from './Auth/index';

export default function AppRouter() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export function AppRoutes() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Spinner label="Cargando datos..." color="secondary" size="lg" />
      </div>
    );
  }

  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={`/${authPaths.root}/${authPaths.signIn}`} />}
        />
        <Route path={authPaths.root} element={<AuthLayout />}>
          {authRoutes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path={`/${userPaths.root}`} element={<AppLayout />}>
            {userRoutes.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}
          </Route>
        </Route>
      </Routes>
    </main>
  );
}
