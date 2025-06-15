import { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import {
  getFormFieldDescriptionId,
  getFormFieldLabelId,
} from '../../../../components/FormField/FormField.helpers';
import {
  formFieldDescriptionClassName,
  formFieldLabelClassName,
} from '../../../../components/FormField/FormField.styles';
import { Input } from '../../../../components/Input/Input';
import { type LoginDetailsFormValues } from '../FormContainer/FormContainer';

const SECURE_NUMBER_DIGITS_COUNT = 6;

export const SecureNumberField: React.FC = () => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const { getValues, setValue } = useFormContext<LoginDetailsFormValues>();

  const focusInput = (index: number) => {
    inputsRef.current[index]?.focus();
  };

  const createKeyDownHandler =
    (index: number) => (event: React.KeyboardEvent) => {
      const securityNumbers = getValues('securityNumbers');
      if (
        event.key === 'Backspace' &&
        securityNumbers[index] === '' &&
        index > 0
      ) {
        focusInput(index - 1);
      }
    };

  const createChangeHandler =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (!/^\d?$/.test(value)) return;

      const secureNumbers = getValues('securityNumbers');
      secureNumbers[index] = value;
      setValue('securityNumbers', secureNumbers);

      if (value && index < SECURE_NUMBER_DIGITS_COUNT - 1) {
        focusInput(index + 1);
      }
    };

  const createPasteHandler =
    (index: number) => (event: React.ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault();
      const value = event.clipboardData.getData('text')?.trim();

      if (value === '' || !/^\d?$/.test(value)) return;

      if (value.length === 1) {
        const secureNumbers = getValues('securityNumbers');
        secureNumbers[index] = value;
        setValue('securityNumbers', secureNumbers);
      }

      if (value.length === SECURE_NUMBER_DIGITS_COUNT) {
        setValue('securityNumbers', value.split(''));
        focusInput(SECURE_NUMBER_DIGITS_COUNT - 1);
        return;
      }
    };

  return (
    <fieldset
      role="group"
      aria-labelledby={getFormFieldLabelId('secureNumber')}
      aria-describedby={getFormFieldDescriptionId('secureNumber')}
      className="mt-5"
    >
      <legend
        id={getFormFieldLabelId('secureNumber')}
        className={twMerge(formFieldLabelClassName({ description: true }))}
      >
        Secure number
      </legend>
      <p
        id={getFormFieldDescriptionId('secureNumber')}
        className={formFieldDescriptionClassName}
      >
        Create a 6 digit number to access your account
      </p>
      <div className="flex space-x-4 mt-1">
        {Array.from({ length: SECURE_NUMBER_DIGITS_COUNT }).map((_, index) => (
          <Controller<Pick<LoginDetailsFormValues, 'securityNumbers'>>
            key={`secureNumber${index}`}
            name={`securityNumbers.${index}`}
            render={({ field }) => (
              <Input
                {...field}
                ref={(el) => {
                  inputsRef.current[index] = el;
                  field.ref(el);
                }}
                name={`secureNumber.${index}`}
                value={field.value ?? ''}
                onKeyDown={createKeyDownHandler(index)}
                onChange={createChangeHandler(index)}
                onPaste={createPasteHandler(index)}
                inputMode="numeric"
                pattern="\d*"
                maxLength={1}
                autoComplete="off"
                aria-label={`Digit ${index + 1} of 6`}
                className="w-full text-center font-medium"
              />
            )}
          />
        ))}
      </div>
    </fieldset>
  );
};
