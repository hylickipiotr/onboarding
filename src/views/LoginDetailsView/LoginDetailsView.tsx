import { Button } from '../../components/Button/Button';
import { PageHeading } from '../../components/PageHeading/PageHeading';
import { PasswordField } from './components/PasswordField/PasswordField';
import { SecureNumberField } from './components/SecureNumberField/SecureNumberField';
import { SecurityQuestionsField } from './components/SecurityQuestionsField/SecurityQuestionsField';

export const LoginDetailsView: React.FC = () => {
  return (
    <div className="px-4 py-6">
      <PageHeading title="Create your login details">
        <p className="text-gray-900">
          You'll need these to log in to the website or app, unless you use face
          or fingerprint recognition.
        </p>
      </PageHeading>
      <form>
        <PasswordField />
        <SecureNumberField />
        <SecurityQuestionsField />
        <Button type="submit" className="w-full mt-4">Continue</Button>
      </form>
    </div>
  );
};
