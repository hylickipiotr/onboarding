import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import type React from 'react';
import {
  unstable_HistoryRouter as HistoryRouter,
  Outlet,
  Route,
  Routes,
  type HistoryRouterProps,
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

export const renderWithRouter = (
  element: React.ReactNode,
  {
    dashboardPath,
    initialEntries = ['/'],
    initialIndex = 0,
    appContext,
  }: ReactWithRouterOptions = {}
) => {
  const Wrapper = () => {
    return (
      <AppContextProvider defaultState={appContext}>
        <Outlet />
      </AppContextProvider>
    );
  };

  const history = createMemoryHistory({ initialEntries, initialIndex });

  render(
    <HistoryRouter
      history={history as unknown as HistoryRouterProps['history']}
    >
      <Routes>
        <Route element={<Wrapper />}>
          <Route path="/" element={element} />
          {dashboardPath ? (
            <Route
              path={dashboardPath}
              element={<AppContextTestingDashboard />}
            />
          ) : null}
          <Route path="*" element={<p>Not found</p>} />
        </Route>
      </Routes>
    </HistoryRouter>
  );

  return {
    history,
  };
};
