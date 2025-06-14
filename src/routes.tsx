import { Navigate, type RouteObject } from 'react-router';
import { LoginDetailsConfirmationView } from './views/LoginDetailsConfirmationView/LoginDetailsConfirmationView';
import { LoginDetailsView } from './views/LoginDetailsView/LoginDetailsView';

export const routes = [
  {
    path: '/',
    element: <Navigate to="/login-details" replace />,
  },
  {
    path: '/login-details',
    element: <LoginDetailsView />,
  },
  {
    path: '/login-details/confirmation',
    element: <LoginDetailsConfirmationView />,
  },
  {
    path: '*',
    element: <Navigate to="/login-details" replace />,
  },
] satisfies RouteObject[];
