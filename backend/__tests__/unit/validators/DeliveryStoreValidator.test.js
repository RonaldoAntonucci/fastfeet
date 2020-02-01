/* eslint-disable no-undef */
import DeliveryStoreValidator from '../../../src/App/Validators/DeliveryStoreValidator';

describe('Delivery Store Validator', () => {
  it('Happy Way', async () => {
    const delivery = {
      recipient_id: 1,
      product: 'productName',
    };

    const res = await DeliveryStoreValidator(
      { body: delivery, params: { deliverymanId: 1 } },
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

  it('Should be return errors (required)', async () => {
    const res = await DeliveryStoreValidator(
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
    expect(res.messages.length).toBe(3);
  });

  it('Should be return errors (invalid)', async () => {
    const res = await DeliveryStoreValidator(
      {
        body: {
          product: null,
          recipient_id: null,
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
