import { useLoginDetails } from '../../contexts/AppContext';
import { LoginDetailsView } from './LoginDetailsView';

export const LoginDetailsViewGuard: React.FC = () => {
  const { loginDetails } = useLoginDetails();

  // TODO check if default values are valid
  return (
    <LoginDetailsView
      loginDetails={
        loginDetails
          ? {
              password: loginDetails.password,
              securityNumbers: loginDetails.securityNumber.split(''),
              securityQuestions: loginDetails.securityQuestions,
            }
          : undefined
      }
    />
  );
};
