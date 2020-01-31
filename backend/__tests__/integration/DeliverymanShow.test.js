/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/Start/app';

import { factory, truncate, getToken, onlyAdmin, onlyAuth } from '../utils';

describe('Deliveryman Store', () => {
  afterEach(async () => {
    await truncate();
  });

  onlyAuth({ path: '/deliverymans/naoImporta', method: 'get' });

  onlyAdmin({ path: '/deliverymans/naoImporta', method: 'get' });

  it('Should can be Show a Deliveryman', async () => {
    const [token, deliveryman] = await Promise.all([
      getToken({ isAdmin: true }),
      factory.create('Deliveryman'),
    ]);

    const { status, body } = await request(app)
      .get(`/deliverymans/${deliveryman.id}`)
      .set('Authorization', `Berar ${token}`)
      .send();

    expect(status).toBe(200);
    expect({
      ...body,
      createdAt: new Date(body.createdAt),
      updatedAt: new Date(body.updatedAt),
    }).toStrictEqual(deliveryman.toJSON());
  });

  it('Should can not be Show a Deliveryman with invalid id', async () => {
    const token = await getToken({ isAdmin: true });

    const { status, body } = await request(app)
      .get(`/deliverymans/invalidId`)
      .set('Authorization', `Berar ${token}`)
      .send();

    expect(status).toBe(400);
    expect(body.message).toBe('Invalid deliveryman id.');
    expect(body).not.toHaveProperty('error');
  });
});
