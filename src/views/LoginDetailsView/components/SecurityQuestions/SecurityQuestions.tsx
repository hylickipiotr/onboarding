import { twMerge } from 'tailwind-merge';
import {
  getFormFieldDescriptionId,
  getFormFieldLabelId,
} from '../../../../components/FormField/FormField.helpers';
import {
  formFieldDescriptionClassName,
  formFieldLabelClassName,
} from '../../../../components/FormField/FormField.styles';
import { SecurityQuestionField } from '../SecurityQuestionField/SecurityQuestionField';
import { SecurityAnswerField } from '../SecurityAnswerField/SecurityAnswerField';
import { SECURITY_QUESTIONS_COUNT } from './SecurityQuestions.config';

export const SecurityQuestions: React.FC = () => {
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
      <ul className="mt-4 space-y-5">
        {Array.from({ length: SECURITY_QUESTIONS_COUNT }).map((_, index) => (
          <li key={index}>
            <SecurityQuestionField  index={index} />
            <SecurityAnswerField index={index} />
          </li>
        ))}
      </ul>
    </fieldset>
  );
};
