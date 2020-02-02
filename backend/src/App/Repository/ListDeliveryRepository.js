import Delivery from '../Models/Delivery';

export default {
  async run({ page = 1, quantity = 20 } = {}) {
    const { rows: data, count } = await Delivery.findAndCountAll({
      limit: quantity,
      offset: (page - 1) * quantity,
      order: ['updated_at'],
    });

    return { data, count, totalPages: Math.ceil(count / quantity) };
  },
};
