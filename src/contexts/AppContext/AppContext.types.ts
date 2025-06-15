import type { LoginDetailsAction, LoginDetailsState } from "./LoginDetails/LoginDetails.types";

export type AppContextAction =
  LoginDetailsAction

export type AppContextState = {
  loginDetails: LoginDetailsState | null;
};
