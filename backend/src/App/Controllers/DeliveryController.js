import CreateDelivery from '../Services/CreateDeliveryService';

import ListDelivery from '../Repository/ListDeliveryRepository';

import Delivery from '../Models/Delivery';

export default {
  async index({ query }, res) {
    return res.json(await ListDelivery.run(query)).send();
  },

  async show({ params: { deliveryId: id } }, res) {
    const delivery = await Delivery.findByPk(id);
    if (!delivery) {
      return res.status(400).json({ message: 'Invalid delivery id.' });
    }
    return res.json(delivery).send();
  },

  async store({ body }, res) {
    return res.json(await CreateDelivery.run(body)).send();
  },
};
