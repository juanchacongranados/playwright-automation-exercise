// utils/fakerHelper.js
const { faker } = require('@faker-js/faker');

function getRandomQuantity(min = 1, max = 20) {
  return faker.number.int({ min, max });
}

module.exports = {
  getRandomQuantity,
};
