import type { AppContextAction, AppContextState } from "./AppContext.types";
import { LOGIN_DETAILS_ACTION_TYPES } from "./LoginDetails/LoginDetails.actions";

export const appContextReducer = (
  state: AppContextState,
  action: AppContextAction
) => {
  switch (action.type) {
    case LOGIN_DETAILS_ACTION_TYPES.SET_LOGIN_DETAILS:
      return {
        ...state,
        loginDetails: action.payload,
      };
    default:
      return state;
  }
};
