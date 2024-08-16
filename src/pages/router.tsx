import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { authPaths } from '@/constants/routerPaths';
import AuthLayout from '@/layout/Auth';
import { AuthProvider } from '@/context/AuthProvider';
import { authRoutes } from '@/routes/auth.routes';

export default function AppRouter() {
  return (
    <Router>
      <AuthProvider>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Navigate to={`/${authPaths.root}/${authPaths.signIn}`} />
              }
            />
            <Route path={authPaths.root} element={<AuthLayout />}>
              {authRoutes.map(({ path, element }, index) => (
                <Route key={index} path={path} element={element} />
              ))}
            </Route>
          </Routes>
        </main>
      </AuthProvider>
    </Router>
  );
}
