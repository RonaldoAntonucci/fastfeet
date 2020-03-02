import CreateProblem from '../Services/CreateProblemService';

import ListProblem from '../Repository/ListProblemRepository';

import Problem from '../Models/Problem';
import Delivery from '../Models/Delivery';

export default {
  async index({ params, query, url }, res) {
    const { page = 1, quantity = 20, scopes } = query;
    const scopesJson = scopes ? JSON.parse(scopes) : [];
    const { deliverymanId, deliveryId } = params;

    if (deliverymanId && deliveryId) {
      const { rows: data, count } = await Problem.findAndCountAll({
        limit: quantity,
        offset: (page - 1) * quantity,
        order: [['updated_at', 'DESC']],
        where: {
          delivery_id: deliveryId,
        },
        include: [
          {
            model: Delivery,
            where: {
              deliveryman_id: deliverymanId,
            },
          },
        ],
      });

      const result = { data, count, totalPages: Math.ceil(count / quantity) };
      return res.json(result);
    }

    return res.json(
      await ListProblem.run(
        params,
        { page, quantity, scopes: scopesJson },
        { url }
      )
    );
  },

  async store({ body, url, params: { deliveryId: delivery_id } }, res) {
    return res.json(await CreateProblem.run({ ...body, delivery_id }, { url }));
  },
};
