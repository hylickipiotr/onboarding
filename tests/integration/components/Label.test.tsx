import { render, screen } from '@testing-library/react';
import { Label } from '../../../src/components/Label/Label';

describe('Label', () => {
  it('should render correctly', () => {
    // When a component with children is rendered
    render(<Label htmlFor="label">Click me</Label>);

    // Then it should render correctly
    const label = screen.getByText(/click me/i);
    expect(label).toBeInTheDocument();

    // And it should render a label
    expect(label.tagName).toBe('LABEL');

    // And it should have the default props
    expect(label).toHaveAttribute('for', 'label');
    expect(label).toHaveClass('text-gray-700');
  });
});
