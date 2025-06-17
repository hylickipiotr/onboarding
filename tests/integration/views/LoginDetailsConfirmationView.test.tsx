import { screen } from '@testing-library/react';
import { LoginDetailsConfirmationViewGuard } from '../../../src/views/LoginDetailsConfirmationView/LoginDetailsConfirmationView.guard';
import { loginDetailsFactory } from '../factories/loginDetailsFactory';
import { renderWithRouter } from '../utils/renderWithRouter';

describe('LoginDetailsConfirmationView', () => {
  describe('happy path', () => {
    it('should render login details', async () => {
      // Given a login details
      const loginDetails = loginDetailsFactory.build();

      // Given a rendered component with login details
      renderWithRouter(<LoginDetailsConfirmationViewGuard />, {
        appContext: {
          loginDetails,
        },
      });

      // Then heading should be rendered
      expect(
        screen.getByRole('heading', {
          name: 'Confirm your login details',
          level: 1,
        })
      );

      // And inspector element should be rendered
      const preElement = screen.getByTestId(
        'login-details-confirmation-inspector'
      );
      expect(preElement).toHaveTextContent(
        `{ "password": "${loginDetails.password}", "security_number": "${loginDetails.securityNumber}", "security_questions": [ { "question": "${loginDetails.securityQuestions[0].question}", "answer": "${loginDetails.securityQuestions[0].answer}" }, { "question": "${loginDetails.securityQuestions[1].question}", "answer": "${loginDetails.securityQuestions[1].answer}" }, { "question": "${loginDetails.securityQuestions[2].question}", "answer": "${loginDetails.securityQuestions[2].answer}" } ] }` 
      );
    });
  });

  describe('unhappy path', () => {
    it('should be redirected to login details page when login details are not set', async () => {
      // Given a rendered component
      const { history } = renderWithRouter(
        <LoginDetailsConfirmationViewGuard />
      );

      // Then it should redirect to login details page
      expect(history.location.pathname).toBe('/login-details');

      // And history index should be 0
      // TODO fix this
      // expect(history.index).toBe(0);
    });
  });
});
