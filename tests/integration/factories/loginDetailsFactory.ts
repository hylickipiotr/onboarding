import { faker } from "@faker-js/faker";

import factory from "factory.ts";

import type { LoginDetailsState } from "../../../src/contexts/AppContext/LoginDetails/LoginDetails.types";

export const generatePassword = () => {
  const upperCaseFragment = faker.string.alphanumeric({
    length: faker.number.int({ min: 3, max: 10 }),
    casing: 'upper',
  });
  const lowerCaseFragment = faker.string.alphanumeric({
    length: faker.number.int({ min: 3, max: 10 }),
    casing: 'lower',
  });
  const numberFragment = faker.string.numeric({
    length: faker.number.int({ min: 2, max: 10 }),
  });
  return `${upperCaseFragment}${lowerCaseFragment}${numberFragment}`;
};

export const loginDetailsFactory = factory.Sync.makeFactory<LoginDetailsState>({
  password: factory.each(generatePassword),
  securityNumber: factory.each(() =>
    faker.string.numeric({
      length: 6,
    })
  ),
  securityQuestions: factory.each(() => [
    {
      question: 'maiden-name',
      answer: faker.person.firstName(),
    },
    {
      question: 'city-of-birth',
      answer: faker.location.city(),
    },
    {
      question: 'first-pet-name',
      answer: faker.animal.dog(),
    },
  ]),
});
