/* eslint-disable no-undef */
import request from 'supertest';
import { factory, truncate, getToken, onlyAuth, onlyAdmin } from '../utils';
import app from '../../src/Start/app';

describe('Deliveryman Update', () => {
  afterEach(async () => {
    await truncate();
  });

  onlyAuth({ path: '/deliverymans/naoImporta', method: 'put' });

  onlyAdmin({ path: '/deliverymans/naoImporta', method: 'put' });

  it('Should can be update a Deliveryman', async () => {
    const [deliveryman, newAttrs, token] = await Promise.all([
      factory.create('Deliveryman'),
      factory.attrs('Deliveryman'),
      getToken({ isAdmin: true }),
    ]);

    const { status, body } = await request(app)
      .put(`/deliverymans/${deliveryman.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newAttrs);

    expect(status).toBe(200);
    expect(body).toHaveProperty('name', newAttrs.name);
    expect(body).toHaveProperty('email', deliveryman.email);
    expect(body).toHaveProperty('avatar_id', newAttrs.avatar_id);
    expect(body).toHaveProperty('id', deliveryman.id);
  });

  it('Should can not update Deliveryman without valid data', async () => {
    const token = await getToken({ isAdmin: true });
    const { status, body } = await request(app)
      .put(`/deliverymans/naoImporta`)
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
    expect(body).toHaveProperty('messages');
  });

  it('Should can not be Update a Deliveryman with invalid id', async () => {
    const [token, attrs] = await Promise.all([
      getToken({ isAdmin: true }),
      factory.attrs('Deliveryman'),
    ]);

    const { status, body } = await request(app)
      .put(`/deliverymans/invalidId`)
      .set('Authorization', `Berar ${token}`)
      .send(attrs);

    expect(status).toBe(400);
    expect(body.message).toBe('Invalid Deliveryman id.');
    expect(body).not.toHaveProperty('error');
  });
});
