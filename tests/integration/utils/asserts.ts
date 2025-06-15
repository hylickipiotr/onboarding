import { screen } from "@testing-library/react";

export const assertAppContextValue = (name: string, value: unknown) => {
  const element = screen.getByTestId(name);
  expect(element).toHaveAttribute('data-value', value);
};
