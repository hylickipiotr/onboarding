import { useController } from 'react-hook-form';
import { FormField } from '../../../../components/FormField/FormField';
import { Input } from '../../../../components/Input/Input';
import type { LoginDetailsFormValues } from '../FormContainer/FormContainer';
import { PasswordRequirement } from './PasswordRequirement';

export const passwordChecks = [
  {
    label: 'At least 8 characters',
    validate: (value: string) => value.trim().length >= 8,
  },
  {
    label: '1 lowercase letter',
    validate: (value: string) => /[a-z]/.test(value),
  },
  {
    label: '1 number',
    validate: (value: string) => /\d/.test(value),
  },
  {
    label: '1 uppercase letter',
    validate: (value: string) => /[A-Z]/.test(value),
  },
] as const;

export const PasswordField: React.FC = () => {
  const { field, fieldState } = useController<
    Pick<LoginDetailsFormValues, 'password'>
  >({
    name: 'password',
  });

  return (
    <FormField
      className="mt-5"
      label="Password"
      name="password"
      description="At least 8 characters, 1 lowercase letter, 1 number and 1 uppercase letter"
    >
      <Input
        data-testid="password"
        type="password"
        id="password"
        aria-describedby="password-description"
        error={!!fieldState.error}
        {...field}
      />
      <ul
        className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2"
        aria-live="polite"
      >
        {passwordChecks.map((check) => (
          <PasswordRequirement
            key={check.label}
            label={check.label}
            valid={check.validate(field.value)}
            error={!!fieldState.error}
          />
        ))}
      </ul>
    </FormField>
  );
};
