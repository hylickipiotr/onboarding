import { render } from '@testing-library/react';
import type React from 'react';
import {
  createMemoryRouter,
  Outlet,
  RouterProvider
} from 'react-router';
import { AppContextProvider } from '../../../src/contexts/AppContext';
import { AppContextTestingDashboard } from './AppContextTestingDashboard';

type ReactWithRouterOptions = {
  dashboardPath?: string;
};

export const renderWithRouter = (
  element: React.ReactNode,
  { dashboardPath }: ReactWithRouterOptions = {}
) => {

  const Wrapper = () => {
    return (
      <AppContextProvider>
        <Outlet />
      </AppContextProvider>
    );
  };

  const router = createMemoryRouter(
    [
      {
        element: <Wrapper />,
        children: [
          {
            path: '/',
            element,
          },
          ...(dashboardPath
            ? [
                {
                  path: dashboardPath,
                  element: <AppContextTestingDashboard />,
                },
              ]
            : []),
          {
            path: '*',
            element: <p>Not found</p>,
          },
        ],
      },
    ],
    { initialEntries: ['/'], initialIndex: 0 }
  );

  render(<RouterProvider router={router} />);

  return {
    router,
  };
};
