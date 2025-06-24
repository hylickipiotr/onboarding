import { PageHeading } from '../../components/PageHeading/PageHeading';
import type { LoginDetailsState } from '../../contexts/AppContext/LoginDetails/LoginDetails.types';
import { LoginDetailsInspector } from './components/LoginDetailsInspector/LoginDetailsInspector';

type LoginDetailsConfirmationViewProps = {
  loginDetails: LoginDetailsState;
};

export const LoginDetailsConfirmationView: React.FC<
  LoginDetailsConfirmationViewProps
> = ({ loginDetails }) => {
  return (
    <div className="px-4 pt-6">
      <PageHeading title="Confirm your login details" />
      <LoginDetailsInspector loginDetails={loginDetails} />
    </div>
  );
};
