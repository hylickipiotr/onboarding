import { z } from "zod";

import { LOGIN_DETAILS_ACTION_TYPES } from "./LoginDetails.actions";

export type LoginDetailsAction = {
  payload: LoginDetailsState;
  type: typeof LOGIN_DETAILS_ACTION_TYPES.SET_LOGIN_DETAILS;
};

export type LoginDetailsState = z.infer<typeof LoginDetailsStateSchema>;

export const LoginDetailsStateSchema = z.object({
  password: z.string(),
  securityNumber: z.string(),
  securityQuestions: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ),
});
