import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from '../../../src/components/Select/Select';

describe('Select', () => {
  it('should render correctly', () => {
    // Given a name
    const name = faker.lorem.word();

    // And a placeholder
    const placeholder = faker.lorem.word();

    // When a component is rendered
    render(<Select name={name} placeholder={placeholder} />);

    // Then it should render correctly
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    // And it should have the default props
    expect(select).toHaveAttribute('name', name);
    expect(select).toHaveAttribute('id', name);
    expect(select).toHaveValue('');
    expect(select).toHaveDisplayValue(placeholder);
    expect(select).toHaveClass('text-gray-900');
  });

  it('should render with custom props', () => {
    // Given an id
    const id = faker.lorem.word();

    // When a component is rendered
    render(
      <Select
        name="test"
        placeholder="select something"
        id={id}
        className="bg-red-500"
        data-testid="test-id"
        aria-label="test label"
      />
    );

    // Then it should have the custom props
    const select = screen.getByRole('combobox', { name: /test label/i });
    expect(select).toHaveAttribute('id', id);
    expect(select).toHaveAttribute('data-testid', 'test-id');
    expect(select).toHaveAttribute('aria-label', 'test label');
  });

  it('should render with custom class', () => {
    // Given a custom class
    const className = 'bg-red-500';

    // When a component is rendered
    render(
      <Select
        name="test"
        placeholder="select something"
        className={className}
      />
    );

    // Then it should have the custom class
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass(className);

    // And it should have the default props
    expect(select).toHaveClass('text-gray-900');
  });

  it('should render with options', () => {
    // Given a name
    const name = faker.lorem.word();

    // And a placeholder
    const placeholder = faker.lorem.word();

    // And options
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ];

    // When a component is rendered
    render(
      <Select name={name} placeholder={placeholder}>
        <option value={options[0].value}>{options[0].label}</option>
        <option value={options[1].value}>{options[1].label}</option>
      </Select>
    );

    // Then it should render the options
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('');
    expect(select).toHaveDisplayValue(placeholder);

    // And it should render the options
    const optionsElements = screen.getAllByRole('option');
    expect(optionsElements).toHaveLength(3);
    expect(optionsElements[0]).toHaveTextContent(placeholder);
    expect(optionsElements[0]).toHaveValue('');
    expect(optionsElements[1]).toHaveTextContent(options[0].label);
    expect(optionsElements[1]).toHaveValue(options[0].value);
    expect(optionsElements[2]).toHaveTextContent(options[1].label);
    expect(optionsElements[2]).toHaveValue(options[1].value);
  });

  it('should render with default value', () => {
    // Given a name
    const name = faker.lorem.word();

    // And a placeholder
    const placeholder = faker.lorem.word();

    // And a default value
    const defaultValue = faker.lorem.word();

    // When a component is rendered
    render(
      <Select name={name} placeholder={placeholder} defaultValue={defaultValue}>
        <option value={defaultValue}>{defaultValue}</option>
      </Select>
    );

    // Then it should have the default value
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue(defaultValue);
  });

  it('should render with value', () => {
    // Given a name
    const name = faker.lorem.word();

    // And a placeholder
    const placeholder = faker.lorem.word();

    // And a value
    const value = faker.lorem.word();

    // When a component is rendered
    render(
      <Select
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={vi.fn()}
      >
        <option value={value}>{value}</option>
      </Select>
    );

    // Then it should have the correct value
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue(value);
  });

  it('should handle change events', async () => {
    // Given a name
    const name = faker.lorem.word();

    // And a placeholder
    const placeholder = faker.lorem.word();

    // And a function to handle change events
    const handleChange = vi.fn();

    // And a default value
    const optionValue = faker.lorem.word();

    // And a component is rendered
    render(
      <Select name={name} placeholder={placeholder} onChange={handleChange}>
        <option value={optionValue}>{optionValue}</option>
      </Select>
    );

    // When selecting an option
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, [optionValue]);

    // Then it should have the correct value
    expect(select).toHaveValue(optionValue);

    // And it should call the handleChange function
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should be disabled', async () => {
    // Given a name
    const name = faker.lorem.word();

    // And a placeholder
    const placeholder = faker.lorem.word();

    // And a function to handle change events
    const handleChange = vi.fn();

    // And a default value
    const optionValue = faker.lorem.word();

    // And a component is rendered
    render(
      <Select
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        disabled
      >
        <option value={optionValue}>{optionValue}</option>
      </Select>
    );

    // When selecting an option
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, [optionValue]);

    // Then it should not have the correct value
    expect(select).toHaveValue('');

    // And it should not call the handleChange function
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should render invalid aria attribute when is in error state', async () => {
    // Given a name
    const name = faker.lorem.word();

    // When render a component with error
    render(<Select name={name} placeholder='select something' error />);

    // Then it should render with invalid aria attribute
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });
});
