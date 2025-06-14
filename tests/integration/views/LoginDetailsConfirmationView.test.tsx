import { render, screen } from '@testing-library/react';
import { LoginDetailsConfirmationView } from '../../../src/views/LoginDetailsConfirmationView/LoginDetailsConfirmationView';

describe('LoginDetailsConfirmationView', () => {
  it('should render view with correct title', () => {
    render(<LoginDetailsConfirmationView />);

    expect(
      screen.getByRole('heading', {
        name: 'LoginDetailsConfirmationView',
        level: 1,
      })
    ).toBeInTheDocument();
  });
});
