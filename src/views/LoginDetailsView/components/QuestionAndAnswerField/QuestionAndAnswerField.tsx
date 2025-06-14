import { FormField } from '../../../../components/FormField/FormField';
import { Input } from '../../../../components/Input/Input';
import { Select } from '../../../../components/Select/Select';
import {
  getAnswerId,
  getQuestionId,
  getQuestionLabel,
} from './QuestionAndAnswerField.helpers';
import type { QuestionAndAnswerFieldProps } from './QuestionAndAnswerField.types';

export const QuestionAndAnswerField: React.FC<QuestionAndAnswerFieldProps> = ({
  name,
  questionIndex,
}) => {
  return (
    <fieldset>
      <FormField
        label={getQuestionLabel(questionIndex)}
        name={getQuestionId(name, questionIndex)}
      >
        <Select
          placeholder="Select a question"
          id={getQuestionId(name, questionIndex)}
          name={getQuestionId(name, questionIndex)}
        />
      </FormField>
      <FormField label="Answer" name={getAnswerId(name, questionIndex)}>
        <Input
          id={getAnswerId(name, questionIndex)}
          name={getAnswerId(name, questionIndex)}
        />
      </FormField>
    </fieldset>
  );
};
