/* eslint-disable no-undef */
import request from 'supertest';
import { factory, truncate, getToken, onlyAuth, onlyAdmin } from '../utils';
import app from '../../src/Start/app';

describe('Recipient Update', () => {
  afterEach(async () => {
    await truncate();
  });

  onlyAuth({ path: '/recipients/naoImporta', method: 'put' });

  onlyAdmin({ path: '/recipients/naoImporta', method: 'put' });

  it('Should can be update a Recipient', async () => {
    const [recipient, newAttrs, token] = await Promise.all([
      factory.create('Recipient'),
      factory.attrs('Recipient'),
      getToken(request(app), { isAdmin: true }),
    ]);

    const { status, body } = await request(app)
      .put(`/recipients/${recipient.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newAttrs);

    expect(status).toBe(200);
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('street');
    expect(body).toHaveProperty('city');
    expect(body).toHaveProperty('number');
    expect(body).toHaveProperty('complement');
    expect(body).toHaveProperty('state');
    expect(body).toHaveProperty('zip');
    expect(body).toHaveProperty('updatedAt');
    expect(body).toHaveProperty('createdAt');
  });

  it('Should can not update recipient without valid data', async () => {
    const token = await getToken(request(app), { isAdmin: true });
    const { status, body } = await request(app)
      .put(`/recipients/naoImporta`)
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
    expect(body).toHaveProperty('messages');
  });
});
