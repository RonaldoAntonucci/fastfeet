import Problem from '../Models/Problem';

export default {
  async run({ deliveryId }, { page = 1, quantity = 20 } = {}) {
    const { rows: data, count } = await Problem.findAndCountAll({
      limit: quantity,
      offset: (page - 1) * quantity,
      where: !deliveryId ? {} : { delivery_id: deliveryId },
      order: ['updated_at'],
    });

    return { data, count, totalPages: Math.ceil(count / quantity) };
  },
};
