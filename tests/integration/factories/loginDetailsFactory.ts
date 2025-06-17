import { faker } from "@faker-js/faker";

import factory from "factory.ts";

import type { LoginDetailsState } from "../../../src/contexts/AppContext/LoginDetails/LoginDetails.types";

export const loginDetailsFactory = factory.Sync.makeFactory<LoginDetailsState>({
  password: factory.each(() =>
    faker.string.alphanumeric({
      length: faker.number.int({ min: 8, max: 100 }),
      casing: 'mixed',
    })
  ),
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
