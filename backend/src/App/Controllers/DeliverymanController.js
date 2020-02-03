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

  async store(req, res, next) {
    return res.json(await CreateDeliveryman.run(req.body));
  },

  async update({ params, body, fileId }, res) {
    return res.json(
      await UpdateDeliveryman.run(params, {
        ...body,
        avatar_id: fileId,
      })
    );
  },

  async delete({ params }, res) {
    await DeleteDeliveryman.run(params);
    return res.send();
  },
};
