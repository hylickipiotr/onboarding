import { Navigate, type RouteObject } from 'react-router';
import { App } from './components/App/App';
import { LoginDetailsConfirmationView } from './views/LoginDetailsConfirmationView/LoginDetailsConfirmationView';
import { LoginDetailsViewGuard } from './views/LoginDetailsView/LoginDetailsView.guard';

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
        element: <LoginDetailsConfirmationView />,
      },
      {
        path: '*',
        element: <Navigate to="/login-details" replace />,
      },
    ],
  },
] satisfies RouteObject[];
