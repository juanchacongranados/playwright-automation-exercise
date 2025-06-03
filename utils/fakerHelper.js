// utils/fakerHelper.js

import { faker } from '@faker-js/faker';

export function getRandomQuantity(min = 1, max = 20) {
  return faker.number.int({ min, max });
}
