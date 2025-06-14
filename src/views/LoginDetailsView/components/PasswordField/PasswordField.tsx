import { FormField } from '../../../../components/FormField/FormField';
import { Input } from '../../../../components/Input/Input';

export const PasswordField: React.FC = () => {
  return (
    <FormField className="mt-5" label="Password" name="password" description="At least 8 characters, 1 lowercase letter, 1 number and 1 uppercase letter">
      <Input
        // TODO: change type to password
        id="password"
        name="password"
        aria-describedby="password-description"
      />
      <ul className="grid grid-cols-2 gap-x-4 mt-2 text-sm text-gray-600 list-disc pl-5">
        <li>At least 8 characters</li>
        <li>1 lowercase letter</li>
        <li>1 number</li>
        <li>1 uppercase letter</li>
      </ul>
    </FormField>
  );
};
