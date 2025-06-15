import { screen } from '@testing-library/react';
import type { LoginDetailsFormValues } from '../../../src/views/LoginDetailsView/components/FormContainer/FormContainer';
import { LoginDetailsView } from '../../../src/views/LoginDetailsView/LoginDetailsView';
import { renderElement } from '../utils/render';

const SECURE_NUMBER_DIGITS_COUNT = 6;
const SECURITY_QUESTIONS_COUNT = 3;

describe('LoginDetailsView', () => {
  it('should render correctly', () => {
    // Given a default values
    const defaultValues = {
      password: 'password',
      securityNumbers: ['1', '2', '3', '4', '5', '6'],
      securityQuestions: [
        {
          question: 'maiden-name',
          answer: 'Maria',
        },
        {
          question: 'city-of-birth',
          answer: 'Warsaw',
        },
        {
          question: 'first-pet-name',
          answer: 'Max',
        },
      ],
    } satisfies LoginDetailsFormValues;

    // When a component is rendered
    renderElement(<LoginDetailsView defaultValues={defaultValues} />);

    // Then it should render page heading
    expect(
      screen.getByRole('heading', {
        name: 'Create your login details',
        level: 1,
      })
    ).toBeInTheDocument();

    // And it should render static text
    expect(
      screen.getByText(
        "You'll need these to log in to the website or app, unless you use face or fingerprint recognition."
      )
    ).toBeInTheDocument();

    // And it should render password label
    const passwordLabel = screen.getByText('Password');
    expect(passwordLabel).toBeInTheDocument();
    expect(passwordLabel).toHaveAttribute('for', 'password');

    // And it should render password field
    const passwordTextbox = screen.getByTestId('password');
    expect(passwordTextbox).toBeInTheDocument();
    expect(passwordTextbox).toBeEnabled();
    expect(passwordTextbox).toHaveAttribute('type', 'password');
    expect(passwordTextbox).toHaveValue('password');

    // And it should render password description
    const passwordDescription = screen.getByText(
      'At least 8 characters, 1 lowercase letter, 1 number and 1 uppercase letter'
    );
    expect(passwordDescription).toBeInTheDocument();
    expect(passwordDescription).toHaveAttribute('id', 'password-description');

    // And it should render secure number field
    expect(
      screen.getByRole('group', {
        name: 'Secure number',
        description: 'Create a 6 digit number to access your account',
      })
    ).toBeInTheDocument();
    Array.from({ length: SECURE_NUMBER_DIGITS_COUNT }).forEach((_, index) => {
      const digitTextbox = screen.getByRole('textbox', {
        name: `Digit ${index + 1} of 6`,
      });
      expect(digitTextbox).toBeInTheDocument();
      expect(digitTextbox).toBeEnabled();
      expect(digitTextbox).toHaveValue(defaultValues.securityNumbers[index]);
    });

    // And it should render security question field
    expect(
      screen.getByRole('group', {
        name: 'Security questions',
        description: "We'll only ask you these if you forget your password.",
      })
    ).toBeInTheDocument();
    Array.from({ length: SECURITY_QUESTIONS_COUNT }).forEach((_, index) => {
      const questionElement = screen.getByRole('combobox', {
        name: `Question ${index + 1}`,
      });
      expect(questionElement).toBeInTheDocument();
      expect(questionElement).toBeEnabled();
      expect(questionElement).toHaveValue(
        defaultValues.securityQuestions[index].question
      );

      const answerElement = screen.getByRole('textbox', {
        name: `Answer ${index + 1}`,
      });
      expect(answerElement).toBeInTheDocument();
      expect(answerElement).toBeEnabled();
      expect(answerElement).toHaveValue(
        defaultValues.securityQuestions[index].answer
      );
    });

    // And it should render continue button
    const continueButton = screen.getByRole('button', {
      name: 'Continue',
    });
    expect(continueButton).toBeInTheDocument();
    expect(continueButton).toHaveAttribute('type', 'submit');
    expect(continueButton).toBeEnabled();
  });

  describe.skip('Password field', () => {});

  describe.skip('Secure number field', () => {});

  describe.skip('Security question fields', () => {});
});
