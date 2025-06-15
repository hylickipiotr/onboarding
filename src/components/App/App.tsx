import { Outlet } from 'react-router';
import { AppContextProvider } from '../../contexts/AppContext';

export const App: React.FC = () => {
  return (
    <AppContextProvider>
      <Outlet />
    </AppContextProvider>
  );
};
