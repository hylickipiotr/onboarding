import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../../../src/components/Input/Input';

describe('Input', () => {
  it('should render correctly', () => {
    // Given a name
    const name = faker.lorem.word();

    // When a component is rendered
    render(<Input name={name} />);

    // Then it should render correctly
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();

    // And it should have the default props
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('name', name);
    expect(input).toHaveAttribute('id', name);
  });

  it('should render with custom props', () => {
    // Given a name
    const name = faker.lorem.word();

    // When a component is rendered
    render(<Input name={name} type="email" placeholder="Enter email" />);

    // Then it should have the custom props
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('placeholder', 'Enter email');
  });

  it('should render with custom class', () => {
    // Given a name
    const name = faker.lorem.word();

    // And a custom class
    const className = 'bg-red-500';

    // When a component is rendered
    render(<Input name={name} className={className} />);

    // Then it should have the custom class
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass(className);

    // And it should have the default props
    expect(input).toHaveClass('text-gray-900');
  });

  it('should render with custom id', () => {
    // Given a name
    const name = faker.lorem.word();

    // And a custom id
    const id = faker.lorem.word();

    // When a component is rendered
    render(<Input name={name} id={id} />);

    // Then it should have the custom id
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', id);

    // And it should have the correct name
    expect(input).toHaveAttribute('name', name);
  });

  it('should render with default value', () => {
    // Given a name
    const name = faker.lorem.word();

    // And a default value
    const defaultValue = faker.lorem.sentence();

    // When a component is rendered
    render(<Input name={name} defaultValue={defaultValue} />);

    // Then it should have the default value
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(defaultValue);
  });

  it('should handle change events', async () => {
    // Given a name
    const name = faker.lorem.word();

    // And a function to handle change events
    const handleChange = vi.fn();

    // And text to type in the input
    const value = faker.lorem.word();

    // And a component is rendered
    render(<Input name={name} onChange={handleChange} />);

    // When entering text in the input
    const input = screen.getByRole('textbox');
    await userEvent.type(input, value);

    // Then it should have the correct value
    expect(input).toHaveValue(value);

    // And it should call the handleChange function
    expect(handleChange).toHaveBeenCalledTimes(value.length);
  });

  it('should be disabled', async () => {
    // Given a name
    const name = faker.lorem.word();

    // And a function to handle change events
    const handleChange = vi.fn();

    // And a component is rendered
    render(<Input name={name} onChange={handleChange} disabled />);

    // When entering text in the input
    const input = screen.getByRole('textbox');
    await userEvent.type(input, faker.lorem.word());

    // Then it should not have the correct value
    expect(input).toHaveValue('');

    // And it should not call the handleChange function
    expect(handleChange).not.toHaveBeenCalled();
  });
});
