import { factory } from 'factory-girl';

import User from '../../src/App/Models/User';
import Deliveryman from '../../src/App/Models/Deliveryman';
import Recipient from '../../src/App/Models/Recipient';
import Admin from '../../src/App/Models/Admin';

import faker from './faker';

factory.define(
  'User',
  User,
  () => ({
    name: faker.name(),
    email: faker.email(),
    password: faker.string({ length: 50 }),
  }),
  {
    afterCreate: async (model, attrs) => {
      if (attrs.isAdmin) {
        await factory.create('Admin', { user_id: model.id });
      }

      return model;
    },
  }
);

factory.define('Admin', Admin, () => ({
  user_id: factory.assoc('User', 'id'),
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

factory.define('Deliveryman', Deliveryman, () => ({
  name: faker.name(),
  email: faker.email(),
}));

factory.randomIteger = faker.integer;

export default factory;
