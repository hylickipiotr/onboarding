import { useLoginDetails } from '../../contexts/AppContext';
import { LoginDetailsStateSchema } from '../../contexts/AppContext/LoginDetails/LoginDetails.types';
import { LoginDetailsView } from './LoginDetailsView';

export const LoginDetailsViewGuard: React.FC = () => {
  const { loginDetails } = useLoginDetails();

  const parsedLoginDetails =
    LoginDetailsStateSchema.safeParse(loginDetails).data;

  return <LoginDetailsView loginDetails={parsedLoginDetails} />;
};
