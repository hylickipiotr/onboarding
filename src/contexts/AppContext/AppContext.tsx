import { createContext } from 'react';
import type { AppContextAction, AppContextState } from './AppContext.types';

export const AppContext = createContext<{
  state: AppContextState;
  dispatch: React.Dispatch<AppContextAction>;
} | null>(null);


