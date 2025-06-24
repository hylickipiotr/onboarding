import type { LoginDetailsFormValues } from '../FormContainer/FormContainer';
import type { Option } from './SecurityQuestionField.types';

export const getAvailableOptions = (
  options: Option[],
  securityQuestions: LoginDetailsFormValues['securityQuestions'],
  fieldIndex: number
) =>
  options.filter(
    (option) =>
      !securityQuestions.some(
        (question, i) => i !== fieldIndex && question.question === option.value
      )
  );
