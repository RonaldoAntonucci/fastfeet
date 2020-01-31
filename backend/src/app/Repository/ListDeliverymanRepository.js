import { Op } from 'sequelize';
import Deliveryman from '../Models/Deliveryman';

export default {
  async run({ page = 1, quantity = 20, q: query = '' }) {
    const { rows: data, count } = await Deliveryman.findAndCountAll({
      limit: quantity,
      offset: (page - 1) * quantity,
      where: {
        [Op.or]: [
          { name: { [Op.substring]: `%${query}%` } },
          { email: { [Op.substring]: `%${query}%` } },
        ],
      },
      order: ['updated_at'],
    });

    return { data, count, totalPages: Math.ceil(count / quantity) };
  },
};
