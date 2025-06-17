import { useController } from 'react-hook-form';
import { FormField } from '../../../../components/FormField/FormField';
import { getFormFieldErrorMessageId } from '../../../../components/FormField/FormField.helpers';
import { Input } from '../../../../components/Input/Input';

type SecurityAnswerFieldProps = {
  index: number;
};

export const SecurityAnswerField: React.FC<SecurityAnswerFieldProps> = ({
  index,
}) => {
  const { field, fieldState } = useController({
    name: `securityQuestions.${index}.answer`,
  });

  return (
    <FormField
      label={`Answer ${index + 1}`}
      name={field.name}
      className="mt-5"
      error={fieldState.error?.message}
    >
      <Input
        {...field}
        id={field.name}
        value={(field.value as string) ?? ''}
        error={!!fieldState.error}
        aria-errormessage={getFormFieldErrorMessageId(field.name)}
      />
    </FormField>
  );
};
