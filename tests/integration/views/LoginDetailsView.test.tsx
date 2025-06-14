import { render, screen } from '@testing-library/react';
import { LoginDetailsView } from '../../../src/views/LoginDetailsView/LoginDetailsView';

describe('LoginDetailsView', () => {
  it('should render view with correct title', () => {
    render(<LoginDetailsView />);

    expect(screen.getByRole('heading', {
      name: 'LoginDetailsView',
      level: 1,
    })).toBeInTheDocument();
  });
});
