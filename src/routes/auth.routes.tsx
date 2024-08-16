import { authPaths } from '@/constants/routerPaths';
import {
  ConfirmAccountPage,
  ForgotPasswordPage,
  NewPasswordPage,
  SignInPage,
  SignUpPage,
} from '@/pages/Auth/index';
import { ReactElement } from 'react';

interface RouteType {
  path: string;
  element: ReactElement;
}

export const authRoutes: RouteType[] = [
  { path: authPaths.signIn, element: <SignInPage /> },
  { path: authPaths.signUp, element: <SignUpPage /> },
  { path: authPaths.forgotPassword, element: <ForgotPasswordPage /> },
  {
    path: `${authPaths.forgotPassword}/:token`,
    element: <NewPasswordPage />,
  },
  {
    path: `${authPaths.confirmAccount}/:token`,
    element: <ConfirmAccountPage />,
  },
];
