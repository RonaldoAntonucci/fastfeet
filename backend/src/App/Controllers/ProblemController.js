import CreateProblem from '../Services/CreateProblemService';

import ListProblem from '../Repository/ListProblemRepository';

export default {
  async index({ params, query }, res) {
    return res.json(await ListProblem.run(params, query));
  },

  async store({ body, params: { deliveryId: delivery_id } }, res) {
    return res.json(await CreateProblem.run({ ...body, delivery_id }));
  },
};
