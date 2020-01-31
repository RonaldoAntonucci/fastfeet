import CreateDeliveryman from '../Services/CreateDeliverymanService';
import UpdateDeliveryman from '../Services/UpdateDeliverymanService';

import ListDeliveryman from '../Repository/ListDeliverymanRepository';

export default {
  async index({ query }, res) {
    return res.json(await ListDeliveryman.run(query));
  },

  async store({ body }, res) {
    return res.json(await CreateDeliveryman.run(body));
  },

  async update({ body, params }, res) {
    return res.json(await UpdateDeliveryman.run(params, body));
  },
};
