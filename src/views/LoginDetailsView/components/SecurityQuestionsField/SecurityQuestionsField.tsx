import { formFieldDescriptionDefaultProps } from '../../../../components/FormField/FormField.config';
import {
  getFormFieldDescriptionId,
  getFormFieldLabelId,
} from '../../../../components/FormField/FormField.helpers';
import { labelDefaultProps } from '../../../../components/Label/Label.config';
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
        className={labelDefaultProps.className}
      >
        Security questions
      </legend>
      <p
        id={getFormFieldDescriptionId('securityQuestions')}
        className={formFieldDescriptionDefaultProps.className}
      >
        We'll only ask you these if you forget your password.
      </p>
      <ul>
        <QuestionAndAnswerField name="securityQuestions" questionIndex={0} />
        <QuestionAndAnswerField name="securityQuestions" questionIndex={1} />
        <QuestionAndAnswerField name="securityQuestions" questionIndex={2} />
      </ul>
    </fieldset>
  );
};
