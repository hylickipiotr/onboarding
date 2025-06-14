import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { PageHeading } from '../../../src/components/PageHeading/PageHeading';

describe('PageHeading', () => {
  it('should render correctly', () => {
    // Given a title
    const title = faker.lorem.sentence();

    // When a component is rendered
    render(<PageHeading title={title} />);

    // Then it should render correctly
    expect(
      screen.getByRole('heading', {
        name: title,
        level: 1,
      })
    ).toBeInTheDocument();
  });

  it('should render with children', () => {
    // Given a title
    const title = faker.lorem.sentence();

    // When a component is rendered
    render(
      <PageHeading title={title}>
        <p>Some children</p>
      </PageHeading>
    );

    // Then the heading should be rendered
    expect(
      screen.getByRole('heading', {
        name: title,
        level: 1,
      })
    ).toBeInTheDocument();

    // And the children should be rendered
    expect(screen.getByText('Some children')).toBeInTheDocument();
  });
});
