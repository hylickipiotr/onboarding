import { twMerge } from 'tailwind-merge';
import {
  getFormFieldDescriptionId,
  getFormFieldLabelId,
} from '../../../../components/FormField/FormField.helpers';
import {
  formFieldDescriptionClassName,
  formFieldLabelClassName,
} from '../../../../components/FormField/FormField.styles';
import { SecurityQuestionField } from '../SecureQuestionField/SecurityQuestionField';
import { SecurityAnswerField } from '../SecurityAnswerField/SecurityAnswerField';
import { SECURITY_QUESTIONS_COUNT } from './SecurityQuestionsField.config';

export const SecurityQuestionsField: React.FC = () => {
  return (
    <fieldset
      role="group"
      id="securityQuestions"
      aria-labelledby={getFormFieldLabelId('securityQuestions')}
      aria-describedby={getFormFieldDescriptionId('securityQuestions')}
      className="mt-6"
    >
      <legend
        id={getFormFieldLabelId('securityQuestions')}
        className={twMerge(formFieldLabelClassName({ description: true }))}
      >
        Security questions
      </legend>
      <p
        id={getFormFieldDescriptionId('securityQuestions')}
        className={formFieldDescriptionClassName}
      >
        We'll only ask you these if you forget your password.
      </p>
      <ul>
        {Array.from({ length: SECURITY_QUESTIONS_COUNT }).map((_, index) => (
          <li key={index} className="mt-2">
            <SecurityQuestionField  index={index} />
            <SecurityAnswerField index={index} />
          </li>
        ))}
      </ul>
    </fieldset>
  );
};
