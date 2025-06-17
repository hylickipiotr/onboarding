import { Button } from '../../components/Button/Button';
import { PageHeading } from '../../components/PageHeading/PageHeading';
import type { LoginDetailsState } from '../../contexts/AppContext/LoginDetails/LoginDetails.types';
import { FormContainer } from './components/FormContainer/FormContainer';
import { PasswordField } from './components/PasswordField/PasswordField';
import { SecureNumberField } from './components/SecureNumberField/SecureNumberField';
import { SecurityQuestionsField } from './components/SecurityQuestionsField/SecurityQuestionsField';

type LoginDetailsViewProps = {
  loginDetails?: LoginDetailsState;
};

export const LoginDetailsView: React.FC<LoginDetailsViewProps> = ({
  loginDetails,
}) => {
  return (
    <FormContainer
      className="px-4 pt-6 pb-8"
      defaultValues={mapLoginDetailsToFormValues(loginDetails)}
    >
      <PageHeading title="Create your login details">
        <p className="text-gray-900">
          You'll need these to log in to the website or app, unless you use face
          or fingerprint recognition.
        </p>
      </PageHeading>
      <PasswordField />
      <SecureNumberField />
      <SecurityQuestionsField />
      <Button type="submit" className="w-full mt-8">
        Continue
      </Button>
    </FormContainer>
  );
};

const mapLoginDetailsToFormValues = (
  loginDetails: LoginDetailsState | undefined
) => {
  if (!loginDetails) return undefined;
  return {
    password: loginDetails.password,
    securityNumbers: loginDetails.securityNumber.split(''),
    securityQuestions: loginDetails.securityQuestions,
  };
};
