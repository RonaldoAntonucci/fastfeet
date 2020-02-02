/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/Start/app';

import { factory, truncate, getToken, onlyAdmin, onlyAuth } from '../utils';

describe('Delivery Show', () => {
  afterEach(async () => {
    await truncate();
  });

  onlyAuth({ path: '/deliveries/naoImporta', method: 'get' });

  onlyAdmin({ path: '/deliveries/naoImporta', method: 'get' });

  it('Should can be Show a Delivery', async () => {
    const [token, delivery] = await Promise.all([
      getToken({ isAdmin: true }),
      factory.create('Delivery'),
    ]);

    const { status, body } = await request(app)
      .get(`/deliveries/${delivery.id}`)
      .set('Authorization', `Berar ${token}`)
      .send();

    expect(status).toBe(200);
    expect({
      ...body,
      createdAt: new Date(body.createdAt),
      updatedAt: new Date(body.updatedAt),
    }).toStrictEqual(delivery.toJSON());
  });

  it('Should can not be Show a Deliveryman with invalid id', async () => {
    const [token, delivery] = await Promise.all([
      getToken({ isAdmin: true }),
      factory.create('Delivery'),
    ]);

    await delivery.destroy();

    const { status, body } = await request(app)
      .get(`/deliveries/${delivery.id}`)
      .set('Authorization', `Berar ${token}`)
      .send();

    expect(status).toBe(400);
    expect(body.message).toBe('Invalid delivery id.');
    expect(body).not.toHaveProperty('error');
  });
});
