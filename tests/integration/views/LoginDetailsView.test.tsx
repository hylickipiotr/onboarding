import {render, screen } from '@testing-library/react';
import { LoginDetailsView } from '../../../src/views/LoginDetailsView/LoginDetailsView';

describe('LoginDetailsView', () => {
  it('should render correctly', () => {
    render(<LoginDetailsView />);

    expect(
      screen.getByRole('heading', {
        name: 'Create your login details',
        level: 1,
      })
    ).toBeInTheDocument();

    const passwordInput = screen.getByRole('textbox', {
      name: 'Password',
      description:
        'At least 8 characters, 1 lowercase letter, 1 number and 1 uppercase letter',
    });
    expect(passwordInput).toBeInTheDocument();
  });
});
