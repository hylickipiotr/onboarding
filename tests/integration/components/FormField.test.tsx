import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { FormField } from '../../../src/components/FormField/FormField';

describe('FormField', () => {
  it('should render correctly', () => {
    // Given a label
    const label = faker.lorem.sentence();

    // And a name
    const name = faker.lorem.word();

    // When a component with children is rendered
    render(
      <FormField label={label} name={name}>
        <input type="text" id={name} />
      </FormField>
    );

    // Then it should render correctly
    const formField = screen.getByRole('textbox', { name: label });
    expect(formField).toBeInTheDocument();
  });

  it('should render with description', () => {
    // Given a label
    const label = faker.lorem.sentence();

    // And a name
    const name = faker.lorem.word();

    // And a description
    const description = faker.lorem.sentence();

    // And a description id
    const descriptionId = `${name}-description`;

    // When a component with children is rendered
    render(
      <FormField label={label} name={name} description={description}>
        <input type="text" id={name} aria-describedby={descriptionId} />
      </FormField>
    );

    // Then it should render correctly
    const formField = screen.getByRole('textbox', { name: label, description });
    expect(formField).toBeInTheDocument();

    // And it should render a description
    const descriptionElement = screen.getByText(description);
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toHaveAttribute('id', descriptionId);
  });

  it('should render error', () => {
    // Given a label
    const label = faker.lorem.sentence();

    // And a name
    const name = faker.lorem.word();

    // And an error
    const error = faker.lorem.sentence();

    // When a component with children is rendered
    render(
      <FormField label={label} name={name} error={error}>
        <input type="text" id={name} />
      </FormField>
    );

    // Then it should render correctly
    const formField = screen.getByRole('textbox', { name: label });
    expect(formField).toBeInTheDocument();

    // And it should render an error
    const errorElement = screen.getByText(error);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass('text-red-600');
  });
});
