import CreateDeliveryman from '../Services/CreateDeliverymanService';

export default {
  async store({ body }, res) {
    return res.json(await CreateDeliveryman.run(body));
  },
};
