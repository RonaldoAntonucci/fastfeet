/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/Start/app';

import { factory, truncate, onlyAuth } from '../utils';

describe('User Store', () => {
  afterEach(async () => {
    await truncate();
  });

  onlyAuth({ path: '/users/naoImporta', method: 'put' });

  it('should be possible to update a User (name, password)', async () => {
    const password = '123456';
    const { id, email } = await factory.create('User', { password });
    const {
      body: { token },
    } = await request(app)
      .post('/sessions')
      .send({ email, password });

    const newName = 'Novo Nome';

    const { status, body } = await request(app)
      .post(`/users/${id}`)
      .set('authorization', `Bearer ${token}`)
      .send({ name: newName, password, passwordConfirm: password });

    expect(status).toBe(200);
    expect(body).toHaveProperty('id', id);
    expect(body).toHaveProperty('name', newName);
    expect(body).toHaveProperty('email', email);
    expect(body).toHaveProperty('createdAt');
    expect(body).toHaveProperty('createdAt');
  });

  it('should can not update user without token', async () => {
    const id = 'test';
    const {
      status,
      body: { error },
    } = await request(app)
      .post(`/users/${id}`)
      .send({});

    expect(status).toBe(401);
    expect(error).toBe('Token not provided');
  });

  it('should can not update user with invalid user id', async () => {
    const password = '123456';
    const { email } = await factory.create('User', { password });
    const id = 'test';
    const {
      body: { token },
    } = await request(app)
      .post('/sessions')
      .send({ email, password });

    const newName = 'Novo Nome';

    const {
      status,
      body: { error },
    } = await request(app)
      .post(`/users/${id}`)
      .set('authorization', `Bearer ${token}`)
      .send({ name: newName, password, passwordConfirm: password });

    expect(status).toBe(400);
    expect(error).toBe('Invalid data.');
  });
});
