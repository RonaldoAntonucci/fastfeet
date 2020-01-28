import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../../src/app/Models/User';
import Recipient from '../../src/app/Models/Recipient';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Recipient', Recipient, {
  name: faker.name.findName(),
  street: faker.address.streetName(),
  number: faker.random.number({ min: 1 }),
  complement: faker.lorem.sentence(),
  state: faker.address.state(),
  city: faker.address.city(),
  zip: '36520-000',
});

export default factory;
