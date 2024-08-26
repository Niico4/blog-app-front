import { userPaths } from '@/constants/routerPaths';
import BlogPage from '@/pages/Blog';
import HomePage from '@/pages/Home';
import { ReactElement } from 'react';

interface RouteType {
  path: string;
  element: ReactElement;
}

export const userRoutes: RouteType[] = [
  { path: userPaths.home, element: <HomePage /> },
  { path: userPaths.blog, element: <BlogPage /> },
  { path: userPaths.aboutUs, element: <h1>sobre nosotros</h1> },
  { path: userPaths.testimonials, element: <h1>testimonios</h1> },
  { path: userPaths.updates, element: <h1>novedades</h1> },
  { path: userPaths.settings, element: <h1>configuración</h1> },
];
