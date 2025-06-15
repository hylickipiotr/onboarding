import { render } from '@testing-library/react';
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  useLocation,
  useNavigationType,
} from 'react-router';
import { AppContextProvider } from '../../../src/contexts/AppContext';

export const renderElement = (element: React.ReactNode) => {
  let navigationTypeResult: string | null = null;
  let locationState: unknown = null;

  const NextPage = () => {
    navigationTypeResult = useNavigationType();
    locationState = useLocation();

    return <p>Next page</p>;
  };

  const Wrapper = () => {
    return (
      <AppContextProvider>
        <Outlet />
      </AppContextProvider>
    );
  };

  const router = createMemoryRouter([
    {
      element: <Wrapper />,
      children: [
        {
          path: '/',
          element,
        },
        {
          path: '*',
          element: <NextPage />,
        },
      ],
    },
  ]);

  const renderResult = render(<RouterProvider router={router} />);

  return {
    ...renderResult,
    navigationTypeResult,
    locationState,
  };
};
