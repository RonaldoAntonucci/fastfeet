/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/Start/app';

import {
  factory,
  truncate,
  getToken,
  faker,
  onlyAdmin,
  onlyAuth,
} from '../utils';

describe('Deliveryman Store', () => {
  afterEach(async () => {
    await truncate();
  });

  onlyAuth({ path: '/deliverymans', method: 'get' });

  onlyAdmin({ path: '/deliverymans', method: 'get' });

  it('Should can be list deliverymans with pagination.', async () => {
    const total = faker.integer({ min: 1, max: 50 });
    const quantity = faker.integer({ min: 1, max: 50 });
    const page = Math.ceil(total / quantity);

    const [token] = await Promise.all([
      getToken(request(app), { isAdmin: true }),
      factory.createMany('Deliveryman', total),
    ]);

    const {
      status,
      body: { data, count, totalPages },
    } = await request(app)
      .get('/deliverymans')
      .query({ page, quantity })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(status).toBe(200);
    expect(data).toHaveLength(
      total > quantity ? quantity + (total - page * quantity) : total
    );
    expect(Number(totalPages)).toBe(Math.ceil(total / quantity));
    expect(Number(count)).toBe(total);
  });

  it('Should can be list deliverymans with pagination and filter by name.', async () => {
    const total = faker.integer({ min: 1, max: 50 });
    const quantity = faker.integer({ min: 1, max: 50 });
    const page = Math.ceil(total / quantity);

    const [token] = await Promise.all([
      getToken(request(app), { isAdmin: true }),
      factory.createMany('Deliveryman', total, { name: 'João' }),
      factory.createMany('Deliveryman', total),
    ]);

    const {
      status,
      body: { data, count, totalPages },
    } = await request(app)
      .get('/deliverymans')
      .query({ page, quantity, q: 'João' })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(status).toBe(200);
    expect(data).toHaveLength(
      total > quantity ? quantity + (total - page * quantity) : total
    );
    expect(Number(totalPages)).toBe(Math.ceil(total / quantity));
    expect(Number(count)).toBe(total);
  });
});
