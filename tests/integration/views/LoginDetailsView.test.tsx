import { faker } from '@faker-js/faker';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { LoginDetailsState } from '../../../src/contexts/AppContext/LoginDetails/LoginDetails.types';
import { SECURE_NUMBER_DIGITS_COUNT } from '../../../src/views/LoginDetailsView/components/SecureNumberField/SecureNumberField';
import { SECURITY_QUESTION_OPTIONS } from '../../../src/views/LoginDetailsView/components/SecurityQuestionField/SecurityQuestionField.config';
import { LoginDetailsViewGuard } from '../../../src/views/LoginDetailsView/LoginDetailsView.guard';
import { generatePassword, loginDetailsFactory } from '../factories/loginDetailsFactory';
import { assertAppContextValue } from '../utils/asserts';
import { renderWithRouter } from '../utils/renderWithRouter';

const SECURITY_QUESTIONS_COUNT = 3;

describe('LoginDetailsView', () => {
  describe('happy path', () => {
    it('should render correctly', () => {
      // Given a login details
      const loginDetails = loginDetailsFactory.build();

      // When a component is rendered with app context
      renderWithRouter(<LoginDetailsViewGuard />, {
        appContext: { loginDetails },
      });

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
      expect(passwordTextbox).toHaveValue(loginDetails.password);

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
        expect(digitTextbox).toHaveValue(loginDetails.securityNumber[index]);
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

    it('should navigate to confirmation page after clicking continue button', async () => {
      // Given a login details
      const loginDetails = loginDetailsFactory.build();

      // And a rendered component with app context
      const { history } = renderWithRouter(<LoginDetailsViewGuard />, {
        appContext: { loginDetails },
        dashboardPath: '/login-details/confirmation',
      });

      // When clicking continue button
      const continueButton = screen.getByRole('button', {
        name: 'Continue',
      });
      await userEvent.click(continueButton);

      // Then it should navigate to confirmation page
      await waitFor(() =>
        expect(history.location.pathname).toBe('/login-details/confirmation')
      );

      // And it should have history index equal to 1
      expect(history.index).toBe(1);
    });

    it('should set login details in app context after clicking continue button', async () => {
      // Given a login details
      const loginDetails = loginDetailsFactory.build();

      // And a rendered component with app context
      const { history } = renderWithRouter(<LoginDetailsViewGuard />, {
        appContext: { loginDetails },
        dashboardPath: '/login-details/confirmation',
      });

      // When clicking continue button
      const continueButton = screen.getByRole('button', {
        name: 'Continue',
      });
      await userEvent.click(continueButton);

      // Then it should navigate to confirmation page
      await waitFor(() =>
        expect(history.location.pathname).toBe('/login-details/confirmation')
      );

      // And it should have history index equal to 1
      expect(history.index).toBe(1);

      // And it should set login details in app context
      assertAppContextValue('loginDetails.password', loginDetails.password);
      assertAppContextValue(
        'loginDetails.securityNumber',
        loginDetails.securityNumber
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
  });

  describe('unhappy path', () => {
    it('should render empty form when the app context contains incorrect shape of login details object', () => {
      // When a render component with app context containing incorrect shape of login details object
      renderWithRouter(<LoginDetailsViewGuard />, {
        appContext: { loginDetails: {} as LoginDetailsState },
      });

      // Then password field should be empty
      expect(screen.getByTestId('password')).toHaveValue('');

      // And security number fields should be empty
      screen
        .getAllByRole('textbox', { name: /Digit \d of \d/i })
        .forEach((textbox) => {
          expect(textbox).toHaveValue('');
        });

      // And security question fields should be empty
      screen
        .getAllByRole('combobox', { name: /Question \d/i })
        .forEach((combobox) => {
          expect(combobox).toHaveValue('');
        });

      // And security answer fields should be empty
      screen
        .getAllByRole('textbox', { name: /Answer \d/i })
        .forEach((textbox) => {
          expect(textbox).toHaveValue('');
        });
    });
  });

  describe('Password field', () => {
    it('should met the length requirement', async () => {
      // Given a string with at least 8 characters
      const password = faker.string.alpha({
        length: faker.number.int({ min: 8, max: 100 }),
      });

      // And a rendered component
      renderWithRouter(<LoginDetailsViewGuard />);

      // And a requirement not met the password
      const notMetLengthRequirement = screen.getByRole('listitem', {
        name: /Requirement not met: At least 8 characters/i,
      });
      expect(notMetLengthRequirement).toBeInTheDocument();

      // And it should have a valid icon
      const notMetIcon = notMetLengthRequirement.querySelector('svg');
      expect(notMetIcon).toHaveClass('tabler-icon-point-filled');
      expect(notMetIcon).not.toHaveClass('text-red-600');

      // When typing password with
      await userEvent.type(screen.getByTestId('password'), password);

      // Then not met requirement should be removed
      expect(
        screen.queryByRole('listitem', {
          name: /Requirement not met: At least 8 characters/i,
        })
      ).not.toBeInTheDocument();

      // And requirement met the password
      const metLengthRequirement = screen.getByRole('listitem', {
        name: /Requirement met: At least 8 characters/i,
      });

      // And it should have a valid icon
      const icon = metLengthRequirement.querySelector('svg');
      expect(icon).toHaveClass('tabler-icon-check');
      expect(icon).toHaveClass('text-emerald-600');
    });

    it('should met the lowercase letter requirement', async () => {
      // Given a string with at least 8 characters
      const password = faker.string.alpha({
        length: faker.number.int({ min: 1, max: 100 }),
        casing: 'lower',
      });

      // And a rendered component
      renderWithRouter(<LoginDetailsViewGuard />);

      // When typing password with
      await userEvent.type(screen.getByTestId('password'), password);

      // Then it should met the lowercase letter requirement
      const lowercaseRequirement = screen.getByRole('listitem', {
        name: /Requirement met: 1 lowercase letter/i,
      });
      expect(lowercaseRequirement).toBeInTheDocument();

      // And it should have a valid icon
      const icon = lowercaseRequirement.querySelector('svg');
      expect(icon).toHaveClass('tabler-icon-check');
      expect(icon).toHaveClass('text-emerald-600');
    });

    it('should met the number requirement', async () => {
      // Given a string with at least 8 characters
      const password = faker.string.numeric({
        length: faker.number.int({ min: 1, max: 100 }),
      });

      // And a rendered component
      renderWithRouter(<LoginDetailsViewGuard />);

      // When typing password with
      await userEvent.type(screen.getByTestId('password'), password);

      // Then it should met the number requirement
      const numberRequirement = screen.getByRole('listitem', {
        name: /Requirement met: 1 number/i,
      });
      expect(numberRequirement).toBeInTheDocument();

      // And it should have a valid icon
      const icon = numberRequirement.querySelector('svg');
      expect(icon).toHaveClass('tabler-icon-check');
      expect(icon).toHaveClass('text-emerald-600');
    });

    it('should met the uppercase letter requirement', async () => {
      // Given a string with at least 8 characters
      const password = faker.string.alpha({
        length: faker.number.int({ min: 1, max: 100 }),
        casing: 'upper',
      });

      // And a rendered component
      renderWithRouter(<LoginDetailsViewGuard />);

      // When typing password with
      await userEvent.type(screen.getByTestId('password'), password);

      // Then it should met the uppercase letter requirement
      const uppercaseRequirement = screen.getByRole('listitem', {
        name: /Requirement met: 1 uppercase letter/i,
      });
      expect(uppercaseRequirement).toBeInTheDocument();

      // And it should have a valid icon
      const icon = uppercaseRequirement.querySelector('svg');
      expect(icon).toHaveClass('tabler-icon-check');
      expect(icon).toHaveClass('text-emerald-600');
    });

    it('should met all requirements', async () => {
      // Given a string with at least 8 characters
      const password = generatePassword();

      // And a rendered component
      renderWithRouter(<LoginDetailsViewGuard />);

      // When typing password with
      await userEvent.type(screen.getByTestId('password'), password);

      // Then it should met all requirements
      const requirements = screen.getAllByRole('listitem', {
        name: /Requirement/i,
      });
      expect(requirements).toHaveLength(4);

      requirements.forEach((requirement) => {
        expect(requirement).toBeInTheDocument();
        expect(requirement).toHaveAttribute('aria-label');
        const icon = requirement.querySelector('svg');
        expect(icon).toHaveClass('tabler-icon-check');
        expect(icon).toHaveClass('text-emerald-600');
      });
    });

    it('should change not met requirement text color when field has validation error', async () => {
      // Given a string with 4 digits
      const password = faker.string.numeric({
        length: 4,
      });

      // And a rendered component
      renderWithRouter(<LoginDetailsViewGuard />);

      // When typing secure number with
      await userEvent.type(screen.getByTestId('password'), password);

      // And clicking on heading (to blur the field)
      await userEvent.click(
        screen.getByRole('heading', { name: /Create your login details/i })
      );

      // Then length requirement text should change color to red
      const notMetLengthRequirement = screen.getByRole('listitem', {
        name: /Requirement not met: At least 8 characters/i,
      });
      expect(notMetLengthRequirement.querySelector('span')).toHaveClass(
        'text-red-600'
      );

      // And the icon should change the color to red
      const notMetLengthRequirementIcon =
        notMetLengthRequirement.querySelector('svg');
      expect(notMetLengthRequirementIcon).toHaveClass(
        'tabler-icon-point-filled'
      );
      expect(notMetLengthRequirementIcon).toHaveClass('text-red-600');

      // And a number requirement text should not change color
      const numberRequirement = screen.getByRole('listitem', {
        name: /Requirement met: 1 number/i,
      });
      expect(numberRequirement.querySelector('span')).toHaveClass(
        'text-gray-500'
      );

      // And the icon should change the color to green
      const numberRequirementIcon = numberRequirement.querySelector('svg');
      expect(numberRequirementIcon).toHaveClass('tabler-icon-check');
      expect(numberRequirementIcon).toHaveClass('text-emerald-600');
    });
  });

  describe('Secure number field', () => {
    it('should focus on first digit when clicking on legend', async () => {
      // Given a rendered component
      renderWithRouter(<LoginDetailsViewGuard />);

      // When clicking on legend
      await userEvent.click(screen.getByText('Secure number'));

      // Then it should focus on first digit
      expect(
        screen.getByRole('textbox', { name: 'Digit 1 of 6' })
      ).toHaveFocus();
    });

    it('should allow to focus only on first digit when field is empty', async () => {
      // Given a rendered component
      renderWithRouter(<LoginDetailsViewGuard />);

      // When clicking on second digit
      await userEvent.click(
        screen.getByRole('textbox', { name: 'Digit 2 of 6' })
      );

      // Then it should focus on second digit
      expect(
        screen.getByRole('textbox', { name: 'Digit 1 of 6' })
      ).toHaveFocus();
    });

    it('should allow to focus on middle digit when all digits are filled', async () => {
      // Given a login details
      const loginDetails = loginDetailsFactory.build();

      // And a rendered component with app context
      renderWithRouter(<LoginDetailsViewGuard />, {
        appContext: { loginDetails },
      });

      // When clicking on second digit
      await userEvent.click(
        screen.getByRole('textbox', { name: 'Digit 2 of 6' })
      );

      // Then it should focus on second digit
      expect(
        screen.getByRole('textbox', { name: 'Digit 2 of 6' })
      ).toHaveFocus();
    });

    it('should focus on next digit field when enter the digit', async () => {
      // Given a rendered component
      renderWithRouter(<LoginDetailsViewGuard />);

      // When entering the digit to first digit field
      const firstDigit = screen.getByRole('textbox', { name: 'Digit 1 of 6' });
      await userEvent.type(firstDigit, '1');

      // Then it should focus on second digit
      expect(screen.getByRole('textbox', { name: 'Digit 2 of 6' }));
    });

    it('should allow to enter only one digit to each field', async () => {
      // Given a rendered component
      renderWithRouter(<LoginDetailsViewGuard />);

      // When enter two digits to first digit field
      const firstDigit = screen.getByRole('textbox', { name: 'Digit 1 of 6' });
      await userEvent.type(firstDigit, '12');

      // Then it should have only one digit
      expect(firstDigit).toHaveValue('1');

      // And the second digit field should have second digit
      const secondDigit = screen.getByRole('textbox', { name: 'Digit 2 of 6' });
      expect(secondDigit).toHaveValue('2');

      // And the third digit field should be focused and empty
      const thirdDigit = screen.getByRole('textbox', { name: 'Digit 3 of 6' });
      expect(thirdDigit).toHaveFocus();
      expect(thirdDigit).toHaveValue('');
    });

    it('should stay focused on last digit field when enter the last digit', async () => {
      // Given a rendered component
      renderWithRouter(<LoginDetailsViewGuard />);

      // When entering the full length of the secure number
      await userEvent.type(
        screen.getByRole('textbox', { name: 'Digit 1 of 6' }),
        '123456'
      );

      // Then it should focus on last digit
      const lastDigit = screen.getByRole('textbox', { name: 'Digit 6 of 6' });
      expect(lastDigit).toHaveFocus();
    });

    it('should focus on previous digit field when clicking on backspace when the field is empty', async () => {
      // Given a rendered component
      renderWithRouter(<LoginDetailsViewGuard />);

      // And entering the full length of the secure number
      await userEvent.type(
        screen.getByRole('textbox', { name: 'Digit 1 of 6' }),
        '123456'
      );

      // And backspacing the last digit field
      const lastDigit = screen.getByRole('textbox', { name: 'Digit 6 of 6' });
      await userEvent.type(lastDigit, '{backspace}');

      // When backspacing the empty digit field
      await userEvent.type(lastDigit, '{backspace}');

      // Then it should focus on previous digit
      const previousDigit = screen.getByRole('textbox', {
        name: 'Digit 5 of 6',
      });
      expect(previousDigit).toHaveFocus();
      expect(previousDigit).toHaveValue('5');
    });

    it('should stay focused on first digit field when backspace the first digit', async () => {
      // Given a rendered component
      renderWithRouter(<LoginDetailsViewGuard />);

      // When backspacing the first empty digit field
      await userEvent.type(
        screen.getByRole('textbox', { name: 'Digit 1 of 6' }),
        '{backspace}'
      );

      // Then it should focus on first digit
      const firstDigit = screen.getByRole('textbox', { name: 'Digit 1 of 6' });
      expect(firstDigit).toHaveFocus();
      expect(firstDigit).toHaveValue('');
    });

    it('should allow to paste the single digit to each field', async () => {
      // Given a rendered component
      renderWithRouter(<LoginDetailsViewGuard />);

      // And clicking on first digit field
      const firstDigit = screen.getByRole('textbox', { name: 'Digit 1 of 6' });
      await userEvent.click(firstDigit);

      // When pasting the digit
      await userEvent.paste('1');

      // Then it should have only one digit
      expect(firstDigit).toHaveValue('1');

      // When clicking on second digit field
      const secondDigit = screen.getByRole('textbox', { name: 'Digit 2 of 6' });
      await userEvent.click(secondDigit);

      // When pasting the digit
      await userEvent.paste('2');

      // Then it should have only one digit
      expect(secondDigit).toHaveValue('2');

      // When clicking on third digit field
      const thirdDigit = screen.getByRole('textbox', { name: 'Digit 3 of 6' });
      await userEvent.click(thirdDigit);

      // And pasting the digit
      await userEvent.paste('3');

      // Then it should have only one digit
      expect(thirdDigit).toHaveValue('3');
    });

    it('should fill the digits when focus first digit field and paste exactly 6 digits', async () => {
      // Given text to paste
      const textToPaste = faker.string.numeric({ length: 6});

      // And a rendered component
      renderWithRouter(<LoginDetailsViewGuard />);

      // And clicking on first digit field
      const firstDigit = screen.getByRole('textbox', { name: 'Digit 1 of 6' });
      await userEvent.click(firstDigit);

      // When pasting the digit
      await userEvent.paste(textToPaste);

      // Then each digit should be filled
      for (let index = 0; index < textToPaste.length; index += 1) {
        const digit = screen.getByRole('textbox', { name: `Digit ${index + 1} of 6` });
        expect(digit).toHaveValue(textToPaste[index]);
      }

      // And the last digit should be focused
      const lastDigit = screen.getByRole('textbox', { name: 'Digit 6 of 6' });
      expect(lastDigit).toHaveFocus();
    });

    it('should mark the field as invalid when blurring the field and the field is empty', async () => {
      // Given a rendered component
      renderWithRouter(<LoginDetailsViewGuard />);

      // When clicking on first digit field
      const firstDigit = screen.getByRole('textbox', { name: 'Digit 1 of 6' });
      await userEvent.click(firstDigit);

      // And blurring the field
      await userEvent.tab();

      // Then it should be marked as invalid
      expect(firstDigit).toHaveAttribute('aria-invalid', 'true');

      // And second digit field should not be valid
      const secondDigit = screen.getByRole('textbox', { name: 'Digit 2 of 6' });
      expect(secondDigit).not.toHaveAttribute('aria-invalid', 'true');

      // When entering the digit
      await userEvent.type(firstDigit, '1');

      // Then it should be marked as valid
      expect(firstDigit).not.toHaveAttribute('aria-invalid', 'true');

      // And second digit field should be focused
      expect(secondDigit).toHaveFocus();

      // And second digit should not be marked as invalid
      expect(secondDigit).not.toHaveAttribute('aria-invalid', 'true');

      // When entering the digit
      await userEvent.type(secondDigit, '2');

      // And backspacing the digit
      await userEvent.type(secondDigit, '{backspace}');

      // Then second digit should be still focused
      expect(secondDigit).toHaveFocus();

      // And second digit should be still valid
      expect(secondDigit).not.toHaveAttribute('aria-invalid', 'true');

      // When backspacing one more time
      await userEvent.type(secondDigit, '{backspace}');

      // Then second digit should be marked as invalid
      expect(secondDigit).toHaveAttribute('aria-invalid', 'true');

      // And third digit should not be valid
      const thirdDigit = screen.getByRole('textbox', { name: 'Digit 3 of 6' });
      expect(thirdDigit).not.toHaveAttribute('aria-invalid', 'true');

      // And first digit should be focused
      expect(firstDigit).toHaveFocus();
    });
  });

  describe('Security question fields', () => {
    it('should render correct amount of security question fields', () => {
      // Given a rendered component
      renderWithRouter(<LoginDetailsViewGuard />);

      // Then it should render 3 security question fields
      expect(
        screen.getAllByRole('combobox', { name: /Question \d/i })
      ).toHaveLength(3);

      // And it should render 3 security answer fields
      expect(
        screen.getAllByRole('textbox', { name: /Answer \d/i })
      ).toHaveLength(3);
    });

    it('should display the validation messages correctly', async () => {
      // Given a question validation message
      const questionValidationMessage =
        'Please choose a question from the list';

      // And an answer validation message
      const answerValidationMessage = 'Please enter an answer';

      // And a rendered component
      renderWithRouter(<LoginDetailsViewGuard />);

      // When clicking on Continue button
      await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

      // Then it should display the validation message correctly for questions field
      const securityQuestions = screen.getAllByRole('combobox', {
        name: /Question \d/i,
      });

      securityQuestions.forEach((question) => {
        expect(question).toHaveAccessibleErrorMessage(
          'Please choose a question from the list'
        );
      });

      // And it should display the validation message correctly for answers field
      const securityAnswers = screen.getAllByRole('textbox', {
        name: /Answer \d/i,
      });

      securityAnswers.forEach((answer) => {
        expect(answer).toHaveAccessibleErrorMessage('Please enter an answer');
      });

      // When selecting a question
      const optionsToSelect = [
        'mother-maiden-name',
        'city-of-birth',
        'first-pet-name',
      ] as const;
      for (
        let securityQuestionIndex = 0;
        securityQuestionIndex < securityQuestions.length;
        securityQuestionIndex += 1
      ) {
        const optionToSelect = optionsToSelect[securityQuestionIndex];
        const securityQuestion = securityQuestions[securityQuestionIndex];
        await userEvent.selectOptions(securityQuestion, [optionToSelect]);

        // Then the error message should be removed
        expect(securityQuestion).not.toHaveAccessibleErrorMessage(
          questionValidationMessage
        );
      }

      // When entering an answer
      const securityAnswersToEnter = ['answer1', 'answer2', 'answer3'] as const;
      for (
        let securityAnswerIndex = 0;
        securityAnswerIndex < securityAnswers.length;
        securityAnswerIndex += 1
      ) {
        const answerToEnter = securityAnswersToEnter[securityAnswerIndex];
        const securityAnswer = securityAnswers[securityAnswerIndex];
        await userEvent.type(securityAnswer, answerToEnter);

        // Then the error message should be removed
        expect(securityAnswer).not.toHaveAccessibleErrorMessage(
          answerValidationMessage
        );
      }
    });

    it('should prevent duplicate question selections across all comboboxes', async () => {
      // Given a rendered component with multiple security question comboboxes
      renderWithRouter(<LoginDetailsViewGuard />);

      const securityQuestions = screen.getAllByRole('combobox', {
        name: /Question \d/i,
      });

      const selectedLabels = new Set<string>();

      // When selecting a unique question in each combobox
      for (const securityQuestion of securityQuestions) {
        const availableOptions = SECURITY_QUESTION_OPTIONS.filter(
          (option) => !selectedLabels.has(option.label)
        );

        const questionToSelect = availableOptions[0];
        selectedLabels.add(questionToSelect.label);

        await userEvent.selectOptions(securityQuestion, questionToSelect.label);
      }

      // Then each combobox should not include previously selected options
      for (const selected of selectedLabels) {
        const duplicateOptions = screen.queryAllByRole('option', {
          name: selected,
        });

        // And should only appear once across all comboboxes
        expect(duplicateOptions).toHaveLength(1);
      }
    });
  });
});
