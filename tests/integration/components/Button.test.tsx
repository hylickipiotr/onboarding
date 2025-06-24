import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../../../src/components/Button/Button';

describe('Button', () => {
  it('should render correctly', () => {
    // When a component with children is rendered
    render(<Button>Click me</Button>);

    // Then it should render correctly
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();

    // And it should have the default props
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveClass('inline-flex');
  });

  it('should render with default and custom class', () => {
    // When a component with custom class is rendered
    render(<Button className="bg-red-500">Click me</Button>);

    // Then it should render correctly
    const button = screen.getByRole('button', { name: /click me/i });

    // And it should have a custom class
    expect(button).toHaveClass('bg-red-500');

    // And it also should have the default props
    expect(button).toHaveClass('inline-flex');
  });

  it('should handle click events', async () => {
    // Given a function to handle click events
    const handleClick = vi.fn();

    // And a component with children
    render(<Button onClick={handleClick}>Click me</Button>);

    // When I click on the button
    const button = screen.getByRole('button', { name: /click me/i });
    await userEvent.click(button);

    // Then it should call the handleClick function
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should render with custom props', () => {
    // When a component with custom props is rendered
    render(
      <Button type="submit" data-testid="test-id" aria-label="test label">
        Click me
      </Button>
    );

    // Then it should have the custom props
    const button = screen.getByRole('button', { name: /test label/i });
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('data-testid', 'test-id');
    expect(button).toHaveAttribute('aria-label', 'test label');
  });
});
