/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/Start/app';

import Delivery from '../../src/App/Models/Delivery';
import Recipient from '../../src/App/Models/Recipient';
import Deliveryman from '../../src/App/Models/Deliveryman';

import { factory, truncate, getToken, onlyAuth, onlyAdmin } from '../utils';

describe('Delivery Create', () => {
  afterEach(async () => {
    await truncate();
  });

  // onlyAuth({ path: '/deliverymans/1/deliveries', method: 'post' });

  // onlyAdmin({ path: '/deliverymans/1/deliveries', method: 'post' });

  it('Should can be Create a Delivery', async () => {
    const [token, attrs] = await Promise.all([
      getToken({ isAdmin: true }),
      factory.attrs('Delivery'),
    ]);

    // await console.log(await factory.createMany('Delivery', 10));
    // const d = await Delivery.create(attrs);
    // await console.log(d.toJSON());
    // await console.log(
    //   await Delivery.destroy({
    //     truncate: true,
    //     force: true,
    //   })
    // );

    const { deliveryman_id } = attrs;

    const { status, body } = await request(app)
      .post(`/deliverymans/${deliveryman_id}/deliveries`)
      .set('Authorization', `Bearer ${token}`)
      .send(attrs);

    console.log(body);

    expect(status).toBe(200);
  });
});
