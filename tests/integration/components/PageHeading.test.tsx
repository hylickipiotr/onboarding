import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { PageHeading } from '../../../src/components/PageHeading/PageHeading';

describe('PageHeading', () => {
  it('should render correctly', () => {
    // Given a title
    const title = faker.lorem.sentence();

    render(<PageHeading title={title} />);

    expect(
      screen.getByRole('heading', {
        name: title,
        level: 1,
      })
    ).toBeInTheDocument();
  });

  it('should render children correctly', () => {
    // Given a title
    const title = faker.lorem.sentence();

    render(
      <PageHeading title={title}>
        <p>Some children</p>
      </PageHeading>
    );

    expect(
      screen.getByRole('heading', {
        name: title,
        level: 1,
      })
    ).toBeInTheDocument();

    expect(screen.getByText('Some children')).toBeInTheDocument();
  });
});
