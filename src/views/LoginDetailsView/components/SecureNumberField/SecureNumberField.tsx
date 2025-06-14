import { formFieldDescriptionDefaultProps } from '../../../../components/FormField/FormField.config';
import {
  getFormFieldDescriptionId,
  getFormFieldLabelId,
} from '../../../../components/FormField/FormField.helpers';
import { Input } from '../../../../components/Input/Input';
import { labelDefaultProps } from '../../../../components/Label/Label.config';

const SECURE_NUMBER_DIGITS_COUNT = 6;

export const SecureNumberField: React.FC = () => {
  return (
    <fieldset
      role="group"
      aria-labelledby={getFormFieldLabelId('secureNumber')}
      aria-describedby={getFormFieldDescriptionId('secureNumber')}
      className='mt-5'
    >
      <legend
        id={getFormFieldLabelId('secureNumber')}
        className={labelDefaultProps.className}
      >
        Secure number
      </legend>
      <p
        id={getFormFieldDescriptionId('secureNumber')}
        className={formFieldDescriptionDefaultProps.className}
      >
        Create a 6 digit number to access your account
      </p>
      <div className="flex space-x-4 mt-1">
        {Array.from({ length: SECURE_NUMBER_DIGITS_COUNT }).map((_, index) => (
          <Input
            key={index}
            inputMode="numeric"
            maxLength={1}
            name={`secureNumber.${index}`}
            aria-label={`Digit ${index + 1} of 6`}
            className="w-full text-center font-medium"
          />
        ))}
      </div>
    </fieldset>
  );
};
