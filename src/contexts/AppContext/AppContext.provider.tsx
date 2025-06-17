import { useReducer } from 'react';
import { AppContext } from './AppContext';
import { appContextReducer } from './AppContext.reducer';
import type { AppContextState } from './AppContext.types';

const initialState = {
  loginDetails: null,
} satisfies AppContextState;

type AppContextProviderProps = {
  defaultState?: Partial<AppContextState>;
};

export const AppContextProvider: React.FC<
  React.PropsWithChildren<AppContextProviderProps>
> = ({ children, defaultState }) => {
  const [state, dispatch] = useReducer(appContextReducer, {
    ...initialState,
    ...defaultState,
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
