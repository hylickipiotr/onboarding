import { render } from '@testing-library/react';
import {
  createMemoryRouter,
  RouterProvider,
  useLocation,
  useNavigationType,
} from 'react-router';

export const renderElement = (element: React.ReactNode) => {
  let navigationTypeResult: string | null = null;
  let locationState: unknown = null;

  const NextPage = () => {
    navigationTypeResult = useNavigationType();
    locationState = useLocation();

    return <p>Next page</p>;
  };

  const router = createMemoryRouter([
    {
      path: '/',
      element,
    },
    {
      path: '*',
      element: <NextPage />,
    },
  ]);

  const renderResult = render(<RouterProvider router={router} />);

  return {
    ...renderResult,
    navigationTypeResult,
    locationState,
  };
};
