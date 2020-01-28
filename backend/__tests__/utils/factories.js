import { factory, MongooseAdapter } from 'factory-girl';
import faker from 'faker';

import User from '../../src/app/Schemas/UserSchema';

factory.setAdapter(new MongooseAdapter());

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export default factory;
