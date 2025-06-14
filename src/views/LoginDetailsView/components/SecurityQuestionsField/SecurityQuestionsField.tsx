import { formFieldDescriptionDefaultProps } from '../../../../components/FormField/FormField.config';
import { getFormFieldDescriptionId } from '../../../../components/FormField/FormField.helpers';
import { labelDefaultProps } from '../../../../components/Label/Label.config';
import { QuestionAndAnswerField } from '../QuestionAndAnswerField/QuestionAndAnswerField';

export const SecurityQuestionsField: React.FC = () => {
  return (
    <fieldset
      id="securityQuestions"
      aria-describedby={getFormFieldDescriptionId('securityQuestions')}
    >
      <legend className={labelDefaultProps.className}>
        Security questions
      </legend>
      <p
        id={getFormFieldDescriptionId('securityQuestions')}
        className={formFieldDescriptionDefaultProps.className}
      >
        We'll only ask you these if you forget your password.
      </p>
      <ul>
        <li>
          <QuestionAndAnswerField name="securityQuestions" questionIndex={0} />
          <QuestionAndAnswerField name="securityQuestions" questionIndex={1} />
          <QuestionAndAnswerField name="securityQuestions" questionIndex={2} />
        </li>
      </ul>
    </fieldset>
  );
};
