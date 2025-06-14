import { FormField } from '../../../../components/FormField/FormField';
import { Input } from '../../../../components/Input/Input';
import { Select } from '../../../../components/Select/Select';
import {
  getAnswerId,
  getAnswerLabel,
  getQuestionId,
  getQuestionLabel,
} from './QuestionAndAnswerField.helpers';
import type { QuestionAndAnswerFieldProps } from './QuestionAndAnswerField.types';

export const QuestionAndAnswerField: React.FC<QuestionAndAnswerFieldProps> = ({
  name,
  questionIndex,
}) => {
  return (
    <li className="mt-5">
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
      <FormField label={getAnswerLabel(questionIndex)} name={getAnswerId(name, questionIndex)} className='mt-5'>
        <Input
          id={getAnswerId(name, questionIndex)}
          name={getAnswerId(name, questionIndex)}
        />
      </FormField>
    </li>
  );
};
