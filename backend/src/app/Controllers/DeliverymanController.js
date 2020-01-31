import CreateDeliveryman from '../Services/CreateDeliverymanService';

import ListDeliveryman from '../Repository/ListDeliverymanRepository';

export default {
  async index({ query }, res) {
    return res.json(await ListDeliveryman.run(query));
  },
  async store({ body }, res) {
    return res.json(await CreateDeliveryman.run(body));
  },
};
