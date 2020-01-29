import { factory } from 'factory-girl';
import Chance from 'chance';

import User from '../../src/app/Models/User';
import Deliveryman from '../../src/app/Models/Deliveryman';
import Recipient from '../../src/app/Models/Recipient';
import Admin from '../../src/app/Models/Admin';

const faker = new Chance();

factory.define(
  'User',
  User,
  () => ({
    name: faker.name(),
    email: faker.email(),
    password: faker.string(),
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

factory.deliveryman = {
  create: async (data = {}) =>
    Deliveryman.create(
      { ...data, user: { ...(await factory.attrs('User')), ...data.user } },
      {
        include: 'user',
      }
    ),
};

export default factory;
