/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';

import { factory, truncate, getToken } from '../utils';

import Deliveryman from '../../src/app/Models/Deliveryman';
import User from '../../src/app/Models/User';

describe('Deliveryman Store', () => {
  afterEach(async () => {
    await truncate();
  });

  it('Should can be Store a Deliveryman', async () => {
    const token = await getToken(request(app), { isAdmin: true });
    const user = await factory.attrs('User');

    const deliveryman = await factory.deliveryman.create();
    console.log(deliveryman.toJSON());

    const { status } = await request(app)
      .post('/deliveryman')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(status).toBe(200);
  });
});
