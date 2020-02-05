import CreateProblem from '../Services/CreateProblemService';

export default {
  async store({ body, params: { deliveryId: delivery_id } }, res) {
    return res.json(await CreateProblem.run({ ...body, delivery_id }));
  },
};
