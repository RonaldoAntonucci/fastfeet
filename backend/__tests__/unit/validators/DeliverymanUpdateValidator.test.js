/* eslint-disable no-undef */
import DeliverymanUpdateValidator from '../../../src/App/Validators/DeliverymanUpdateValidator';
import { factory } from '../../utils';

describe('Deliveryman Update Validator', () => {
  it('Happy Way', async () => {
    const recipient = await factory.attrs('Deliveryman');

    const res = await DeliverymanUpdateValidator(
      { body: recipient, params: { deliverymanId: 1 } },
      {
        status: status => ({
          status,
          json: v => v,
        }),
      },
      () => true
    );

    expect(res).toBe(true);
  });

  it('Should be return errors (required body)', async () => {
    const res = await DeliverymanUpdateValidator(
      { body: null, params: {} },
      {
        status: status => ({
          status,
          json: v => ({ ...v, status }),
        }),
      },
      () => true
    );

    expect(res.status).toBe(400);
    expect(res.error).toBe('Validation fails');
    expect(res.messages.length).toBe(1);
  });

  it('Should be return errors (required deliverymanId)', async () => {
    const res = await DeliverymanUpdateValidator(
      { body: {}, params: {} },
      {
        status: status => ({
          status,
          json: v => ({ ...v, status }),
        }),
      },
      () => true
    );

    expect(res.status).toBe(400);
    expect(res.error).toBe('Validation fails');
    expect(res.messages.length).toBe(1);
  });

  it('Should be return errors (invalid)', async () => {
    const res = await DeliverymanUpdateValidator(
      {
        body: {
          name: '1',
          avatar_id: null,
        },
        params: { deliverymanId: 'invalid' },
      },
      {
        status: status => ({
          status,
          json: v => ({ ...v, status }),
        }),
      },
      () => true
    );

    expect(res.status).toBe(400);
    expect(res.error).toBe('Validation fails');
    expect(res.messages.length).toBe(3);
  });
});
