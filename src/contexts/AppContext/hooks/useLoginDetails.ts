import { useAppContext } from './useAppContext';
import { LOGIN_DETAILS_ACTION_TYPES } from "../LoginDetails/LoginDetails.actions";
import type { LoginDetailsState } from "../LoginDetails/LoginDetails.types";

export const useLoginDetails = () => {
  const { state, dispatch } = useAppContext();

  const setLoginDetails = (loginDetails: LoginDetailsState) => {
    dispatch({
      payload: loginDetails,
      type: LOGIN_DETAILS_ACTION_TYPES.SET_LOGIN_DETAILS,
    });
  };

  return {
    loginDetails: state.loginDetails,
    setLoginDetails,
  };
};
