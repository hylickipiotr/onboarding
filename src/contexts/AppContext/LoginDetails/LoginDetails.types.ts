import { LOGIN_DETAILS_ACTION_TYPES } from "./LoginDetails.actions";

export type LoginDetailsAction = {
  payload: LoginDetailsState;
  type: typeof LOGIN_DETAILS_ACTION_TYPES.SET_LOGIN_DETAILS;
};

export type LoginDetailsState = {
  password: string;
  securityNumber: string;
  securityQuestions: {
    question: string;
    answer: string;
  }[];
};
