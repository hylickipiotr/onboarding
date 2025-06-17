import { Navigate, type RouteObject } from 'react-router';
import { App } from './components/App/App';
import { LoginDetailsViewGuard } from './views/LoginDetailsView/LoginDetailsView.guard';
import { LoginDetailsConfirmationViewGuard } from './views/LoginDetailsConfirmationView/LoginDetailsConfirmationView.guard';

export const routes = [
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Navigate to="/login-details" replace />,
      },
      {
        path: '/login-details',
        element: <LoginDetailsViewGuard />,
      },
      {
        path: '/login-details/confirmation',
        element: <LoginDetailsConfirmationViewGuard />,
      },
      {
        path: '*',
        element: <Navigate to="/login-details" replace />,
      },
    ],
  },
] satisfies RouteObject[];
