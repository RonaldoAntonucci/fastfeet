import CreateDelivery from '../Services/CreateDeliveryService';

export default {
  async store({ body }, res) {
    return res.json(await CreateDelivery.run(body)).send();
  },
};
