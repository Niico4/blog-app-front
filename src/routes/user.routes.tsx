import { userPaths } from '@/constants/routerPaths';
import HomePage from '@/pages/Home';
import { ReactElement } from 'react';

interface RouteType {
  path: string;
  element: ReactElement;
}

export const userRoutes: RouteType[] = [
  { path: userPaths.home, element: <HomePage /> },
  { path: userPaths.profile, element: <h1>hola munod</h1> },
];
