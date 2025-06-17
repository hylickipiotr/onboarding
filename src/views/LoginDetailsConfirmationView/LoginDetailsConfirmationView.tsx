import type { LoginDetailsState } from '../../contexts/AppContext/LoginDetails/LoginDetails.types';

type LoginDetailsConfirmationViewProps = {
  loginDetails: LoginDetailsState;
};

export const LoginDetailsConfirmationView: React.FC<
  LoginDetailsConfirmationViewProps
> = ({ loginDetails }) => {
  return (
    <div>
      <h1>Confirm your login details</h1>
      <pre data-testid="login-details-confirmation-inspector">
        {JSON.stringify(
          {
            password: loginDetails.password,
            security_number: loginDetails.securityNumber,
            security_questions: loginDetails.securityQuestions,
          },
          null,
          2
        )}
      </pre>
    </div>
  );
};
