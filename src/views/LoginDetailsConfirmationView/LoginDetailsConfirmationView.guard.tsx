import { Navigate } from 'react-router';
import { useLoginDetails } from '../../contexts/AppContext';
import { LoginDetailsConfirmationView } from './LoginDetailsConfirmationView';

export const LoginDetailsConfirmationViewGuard: React.FC = () => {
  const { loginDetails } = useLoginDetails();

  if (!loginDetails) return <Navigate to="/login-details" replace />;

  return <LoginDetailsConfirmationView loginDetails={loginDetails} />;
};
