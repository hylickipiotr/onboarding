import type { LoginDetailsState } from '../../../../contexts/AppContext/LoginDetails/LoginDetails.types';

type LoginDetailsInspectorProps = {
  loginDetails: LoginDetailsState;
};

export const LoginDetailsInspector: React.FC<LoginDetailsInspectorProps> = ({
  loginDetails,
}) => {
  return (
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
  );
};
