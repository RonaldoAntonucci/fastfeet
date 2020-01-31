/* eslint-disable no-undef */
import request from 'supertest';
import { factory, truncate, getToken, onlyAuth, onlyAdmin } from '../utils';
import app from '../../src/Start/app';

describe('Deliveryman Update', () => {
  afterEach(async () => {
    await truncate();
  });

  onlyAuth({ path: '/deliverymans/naoImporta', method: 'delete' });

  onlyAdmin({ path: '/deliverymans/naoImporta', method: 'delete' });

  it('Should can be destroy an Deliveryman', async () => {
    const { id } = await factory.create('Deliveryman');

    const token = await getToken({ isAdmin: true });

    const { status } = await request(app)
      .delete(`/deliverymans/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(status).toBe(200);
  });

  it('Should can not be destroy an Deliveryman withou valid id', async () => {
    const token = await getToken({ isAdmin: true });

    const { status, body } = await request(app)
      .delete(`/deliverymans/invalidId`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(status).toBe(400);
    expect(body.message).toBe('Invalid deliveryman id.');
    expect(body).not.toHaveProperty('error');
  });
});
