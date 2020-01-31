import request from 'supertest';
import factory from './factories';

import app from '../../src/Start/app';

export default async ({ isAdmin = false } = {}) => {
  const password = '123456';
  const { email } = await factory.create('User', { password, isAdmin });

  const {
    body: { token },
  } = await request(app)
    .post('/sessions')
    .send({ email, password });
  return token;
};
