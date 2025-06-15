import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { LoginDetailsFormValues } from '../../../src/views/LoginDetailsView/components/FormContainer/FormContainer';
import { LoginDetailsView } from '../../../src/views/LoginDetailsView/LoginDetailsView';
import { assertAppContextValue } from '../utils/asserts';
import { renderWithRouter } from '../utils/renderWithRouter';

const SECURE_NUMBER_DIGITS_COUNT = 6;
const SECURITY_QUESTIONS_COUNT = 3;

describe('LoginDetailsView', () => {
  it('should render correctly', () => {
    // Given a login details
    const loginDetails = {
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
    renderWithRouter(<LoginDetailsView loginDetails={loginDetails} />);

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
      expect(digitTextbox).toHaveValue(loginDetails.securityNumbers[index]);
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
        loginDetails.securityQuestions[index].question
      );

      const answerElement = screen.getByRole('textbox', {
        name: `Answer ${index + 1}`,
      });
      expect(answerElement).toBeInTheDocument();
      expect(answerElement).toBeEnabled();
      expect(answerElement).toHaveValue(
        loginDetails.securityQuestions[index].answer
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

  it('should navigate to confirmation page', async () => {
    // Given a login details
    const loginDetails = {
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

    // And a rendered component
    const { location } = renderWithRouter(
      <LoginDetailsView loginDetails={loginDetails} />,
      {
        dashboardPath: '/login-details/confirmation',
      }
    );

    // When clicking continue button
    const continueButton = screen.getByRole('button', {
      name: 'Continue',
    });
    await userEvent.click(continueButton);

    // Then it should navigate to confirmation page
    await waitFor(() =>
      expect(location.pathname).toBe('/login-details/confirmation')
    );

    // And it should have two history entries
    expect(history.length).toBe(2);
  });

  it('should set login details in app context', async () => {
    // Given a login details
    const loginDetails = {
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

    // And a rendered component
    const { location } = renderWithRouter(
      <LoginDetailsView loginDetails={loginDetails} />,
      {
        dashboardPath: '/login-details/confirmation',
      }
    );

    // When clicking continue button
    const continueButton = screen.getByRole('button', {
      name: 'Continue',
    });
    await userEvent.click(continueButton);

    // Then it should navigate to confirmation page
    expect(location.pathname).toBe('/login-details/confirmation');

    // And it should have two history entries
    expect(history.length).toBe(2);

    // And it should set login details in app context
    assertAppContextValue('loginDetails.password', loginDetails.password);
    assertAppContextValue(
      'loginDetails.securityNumber',
      loginDetails.securityNumbers.join('')
    );
    assertAppContextValue(
      'loginDetails.securityQuestions.0.question',
      loginDetails.securityQuestions[0].question
    );
    assertAppContextValue(
      'loginDetails.securityQuestions.0.answer',
      loginDetails.securityQuestions[0].answer
    );
    assertAppContextValue(
      'loginDetails.securityQuestions.1.question',
      loginDetails.securityQuestions[1].question
    );
    assertAppContextValue(
      'loginDetails.securityQuestions.1.answer',
      loginDetails.securityQuestions[1].answer
    );
    assertAppContextValue(
      'loginDetails.securityQuestions.2.question',
      loginDetails.securityQuestions[2].question
    );
    assertAppContextValue(
      'loginDetails.securityQuestions.2.answer',
      loginDetails.securityQuestions[2].answer
    );
  });

  describe.skip('Password field', () => {});

  describe.skip('Secure number field', () => {});

  describe.skip('Security question fields', () => {});
});
