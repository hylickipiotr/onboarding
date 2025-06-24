import { useController, useFormContext } from 'react-hook-form';
import { FormField } from '../../../../components/FormField/FormField';
import { getFormFieldErrorMessageId } from '../../../../components/FormField/FormField.helpers';
import { Select } from '../../../../components/Select/Select';
import type { LoginDetailsFormValues } from '../FormContainer/FormContainer';
import { SECURITY_QUESTION_OPTIONS } from './SecurityQuestionField.config';
import { getAvailableOptions } from './SecurityQuestionField.helpers';

type QuestionFieldProps = {
  index: number;
};

export const SecurityQuestionField: React.FC<QuestionFieldProps> = ({
  index,
}) => {
  const { watch } = useFormContext<LoginDetailsFormValues>();
  const { field, fieldState } = useController({
    name: `securityQuestions.${index}.question`,
  });
  const securityQuestions = watch('securityQuestions');

  const options = getAvailableOptions(
    SECURITY_QUESTION_OPTIONS,
    securityQuestions,
    index
  );

  return (
    <FormField
      label={`Question ${index + 1}`}
      name={field.name}
      error={fieldState.error?.message}
    >
      <Select
        {...field}
        id={field.name}
        value={(field.value as string) ?? ''}
        placeholder="Select a question"
        error={!!fieldState.error}
        aria-errormessage={getFormFieldErrorMessageId(field.name)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </FormField>
  );
};
