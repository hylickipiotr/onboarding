import { render } from '@testing-library/react';
import type React from 'react';
import {
  createRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from 'react-router';
import { AppContextProvider } from '../../../src/contexts/AppContext';
import type { AppContextState } from '../../../src/contexts/AppContext/AppContext.types';
import { AppContextTestingDashboard } from './AppContextTestingDashboard';

type ReactWithRouterOptions = {
  dashboardPath?: string;
  initialEntries?: string[];
  initialIndex?: number;
  appContext?: Partial<AppContextState>;
};

type History = {
  getPathname: () => string;
  getIndex: () => number;
};

export const renderWithRouter = (
  element: React.ReactNode,
  {
    dashboardPath,
    initialEntries = ['/'],
    initialIndex = 0,
    appContext,
  }: ReactWithRouterOptions = {}
) => {
  const LocationTracker: React.FC<{ ref: React.Ref<History> }> = ({
    ref,
  }) => {
    const location = useLocation();
    const indexRef = useRef(initialIndex);

    const [pathname, setPathname] = useState(location.pathname);

    useEffect(() => {
      setPathname(location.pathname);
      indexRef.current++;
    }, [location.pathname]);

    useImperativeHandle(ref, () => ({
      getPathname: () => pathname,
      getIndex: () => indexRef.current - 1,
    }));

    return null;
  };

  const trackerRef = createRef<History>();

  const Wrapper = () => {
    return (
      <AppContextProvider defaultState={appContext}>
        <LocationTracker ref={trackerRef} />
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
    { initialEntries, initialIndex }
  );

  render(<RouterProvider router={router} />);

  return {
    history: {
      location: {
        get pathname() {
          return trackerRef.current?.getPathname() ?? '';
        },
      },
      get index() {
        return trackerRef.current?.getIndex() ?? -1;
      },
    },
  };
};
