import CreateDelivery from '../Services/CreateDeliveryService';
import UpdateDelivery from '../Services/UpdateDeliveryService';
import CancelDelivery from '../Services/CancelDeliveryService';

import ListDelivery from '../Repository/ListDeliveryRepository';

import Delivery from '../Models/Delivery';

export default {
  async index({ params, query, url }, res) {
    return res.json(await ListDelivery.run({ ...params }, query, { url }));
  },

  async show({ params: { deliveryId: id } }, res) {
    const delivery = await Delivery.findByPk(id);
    if (!delivery) {
      return res.status(400).json({ message: 'Invalid delivery id.' });
    }
    return res.json(delivery).send();
  },

  async store({ body, url }, res) {
    return res.json(await CreateDelivery.run(body, { url })).send();
  },

  async update({ params, body, fileId, url }, res) {
    return res.json(
      await UpdateDelivery.run(
        params,
        { ...body, signature_id: fileId },
        { url }
      )
    );
  },

  async delete({ params, url }, res) {
    await CancelDelivery.run(params, { url });
    return res.send();
  },
};
