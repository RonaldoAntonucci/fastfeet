import { Op } from 'sequelize';
import CreateDeliveryman from '../Services/CreateDeliverymanService';
import Deliveryman from '../Models/Deliveryman';

export default {
  async index(req, res) {
    const { page = 1, quantity = 20, q: query = '' } = req.query;

    const { rows: deliverys, count } = await Deliveryman.findAndCountAll({
      limit: quantity,
      offset: (page - 1) * quantity,
      attributes: ['id', 'name', 'email', 'age'],
      where: {
        [Op.or]: [
          { name: { [Op.substring]: `%${query}%` } },
          { email: { [Op.substring]: `%${query}%` } },
        ],
      },
      order: ['updated_at'],
    });

    const { deliverys: result } = { deliverys, count };
    return res.set({ total_pages: Math.ceil(count / quantity) }).json(result);
  },
  async store({ body }, res) {
    return res.json(await CreateDeliveryman.run(body));
  },
};
