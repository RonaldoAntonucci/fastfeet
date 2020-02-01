import CreateDelivery from '../Services/CreateDeliveryService';

export default {
  async store({ params, body }, res) {
    const { deliverymanId: deliveryman_id } = params;

    return res
      .json(await CreateDelivery.run({ deliveryman_id, ...body }))
      .send();
  },
};
