import { Controller } from 'react-hook-form';
import { FormField } from '../../../../components/FormField/FormField';
import { Input } from '../../../../components/Input/Input';
import { Select } from '../../../../components/Select/Select';
import type { LoginDetailsFormValues } from '../FormContainer/FormContainer';
import {
  getAnswerLabel,
  getQuestionLabel,
} from './QuestionAndAnswerField.helpers';
import type { QuestionAndAnswerFieldProps } from './QuestionAndAnswerField.types';

type Option = {
  label: string;
  value: string;
};

const options = [
  {
    value: 'maiden-name',
    label: "What is your mother's maiden name?",
  },
  {
    value: 'city-of-birth',
    label: 'In what city were you born?',
  },
  {
    value: 'first-pet-name',
    label: 'What was the your first pet called?',
  },
  {
    value: 'first-car-name',
    label: 'What was your first car?',
  },
  {
    value: 'first-concert-name',
    label: 'What was the first concert you attended?',
  },
] satisfies Option[];

export const QuestionAndAnswerField: React.FC<QuestionAndAnswerFieldProps> = ({
  questionIndex,
}) => {
  return (
    <li className="mt-5">
      <Controller<Pick<LoginDetailsFormValues, 'securityQuestions'>>
        name={`securityQuestions.${questionIndex}.question`}
        render={({ field, fieldState }) => (
          <FormField
            label={getQuestionLabel(questionIndex)}
            name={field.name}
            error={fieldState.error?.message}
          >
            <Select
              {...field}
              id={field.name}
              value={(field.value as string) ?? ''}
              placeholder="Select a question"
              error={!!fieldState.error}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormField>
        )}
      />

      <Controller<Pick<LoginDetailsFormValues, 'securityQuestions'>>
        name={`securityQuestions.${questionIndex}.answer`}
        render={({ field, fieldState }) => (
          <FormField
            label={getAnswerLabel(questionIndex)}
            name={field.name}
            className="mt-5"
            error={fieldState.error?.message}
          >
            <Input
              {...field}
              id={field.name}
              value={(field.value as string) ?? ''}
              error={!!fieldState.error}
            />
          </FormField>
        )}
      />
    </li>
  );
};
