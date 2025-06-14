import { FormField } from '../../../../components/FormField/FormField';
import { Input } from '../../../../components/Input/Input';

export const SecureNumberField: React.FC = () => {
  return (
    <FormField
      label="Secure number"
      name="secureNumber"
      description="Create a 6 digit number to access your account"
    >
      <div className="flex space-x-4">
        <Input name="secureNumber.0" />
        <Input name="secureNumber.1" />
        <Input name="secureNumber.2" />
        <Input name="secureNumber.3" />
        <Input name="secureNumber.4" />
        <Input name="secureNumber.5" />
      </div>
    </FormField>
  );
};
