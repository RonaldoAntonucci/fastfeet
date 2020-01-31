import CreateDeliveryman from '../Services/CreateDeliverymanService';
import UpdateDeliveryman from '../Services/UpdateDeliverymanService';
import DeleteDeliveryman from '../Services/DeleteDeliverymanService';

import ListDeliveryman from '../Repository/ListDeliverymanRepository';

import Deliveryman from '../Models/Deliveryman';

export default {
  async index({ query }, res) {
    return res.json(await ListDeliveryman.run(query));
  },

  async show({ params: { deliverymanId: id } }, res) {
    const deliveryman = await Deliveryman.findByPk(id);
    if (!deliveryman) {
      return res.status(400).json({ message: 'Invalid deliveryman id.' });
    }
    return res.json(deliveryman).send();
  },

  async store({ body }, res) {
    return res.json(await CreateDeliveryman.run(body));
  },

  async update({ body, params }, res) {
    return res.json(await UpdateDeliveryman.run(params, body));
  },

  async destroy({ params }, res) {
    await DeleteDeliveryman.run(params);
    return res.send();
  },
};
