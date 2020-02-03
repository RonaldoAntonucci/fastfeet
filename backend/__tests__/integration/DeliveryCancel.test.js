/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/Start/app';

import { factory, truncate, getToken, onlyAuth, onlyAdmin } from '../utils';

import Delivery from '../../src/App/Models/Delivery';

describe('Delivery Create', () => {
  afterEach(async () => {
    await truncate();
  });

  onlyAuth({ path: '/deliveries/id', method: 'delete' });

  onlyAdmin({ path: '/deliveries/id', method: 'delete' });

  it('Should can be cancel a Delivery with admin user.', async () => {
    const [token, delivery] = await Promise.all([
      getToken({ isAdmin: true }),
      factory.create('Delivery'),
    ]);

    const { status } = await request(app)
      .delete(`/deliveries/${delivery.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(status).toBe(200);
    const deletedDelivery = await Delivery.findByPk(delivery.id, {
      paranoid: false,
    });
    expect(deletedDelivery).toHaveProperty('canceledAt');
    expect(deletedDelivery.canceledAt).not.toBe(null);
  });

  it('Should be return error without valid delivery id.', async () => {
    const [token, delivery] = await Promise.all([
      getToken({ isAdmin: true }),
      factory.create('Delivery'),
    ]);

    const { id } = delivery;

    await delivery.destroy();

    const { status } = await request(app)
      .delete(`/deliveries/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(status).toBe(400);
  });
});
