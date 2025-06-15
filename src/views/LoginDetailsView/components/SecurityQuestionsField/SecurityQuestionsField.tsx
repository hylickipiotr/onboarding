import { twMerge } from 'tailwind-merge';
import {
  getFormFieldDescriptionId,
  getFormFieldLabelId,
} from '../../../../components/FormField/FormField.helpers';
import {
  formFieldDescriptionClassName,
  formFieldLabelClassName,
} from '../../../../components/FormField/FormField.styles';
import { QuestionAndAnswerField } from '../QuestionAndAnswerField/QuestionAndAnswerField';

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
        <QuestionAndAnswerField questionIndex={0} />
        <QuestionAndAnswerField questionIndex={1} />
        <QuestionAndAnswerField questionIndex={2} />
      </ul>
    </fieldset>
  );
};
