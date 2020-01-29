import { factory } from 'factory-girl';
import Chance from 'chance';

import User from '../../src/app/Models/User';
import Recipient from '../../src/app/Models/Recipient';

const faker = new Chance();

factory.define('User', User, () => ({
  name: faker.name(),
  email: faker.email(),
  password: faker.string(),
}));

factory.define('Recipient', Recipient, () => ({
  name: faker.name(),
  street: faker.street({ country: 'it' }),
  city: faker.city(),
  number: faker.integer({ min: 1 }),
  complement: faker.sentence(),
  state: faker.state(),
  zip: '36520-000',
}));

export default factory;
