import { useReducer } from 'react';
import { AppContext } from './AppContext';
import { appContextReducer } from './AppContext.reducer';
import type { AppContextState } from './AppContext.types';

const initialState = {
  loginDetails: null,
} satisfies AppContextState;

export const AppContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appContextReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
