import Delivery from '../Models/Delivery';

export default {
  async run({ deliverymanId }, { page = 1, quantity = 20, delivered } = {}) {
    if (deliverymanId) {
      const { rows: data, count } = await Delivery.scope([
        {
          method: ['deliverymanId', deliverymanId],
        },
        {
          method: ['delivered', delivered],
        },
      ]).findAndCountAll({
        limit: quantity,
        offset: (page - 1) * quantity,
        order: ['updated_at'],
      });

      return { data, count, totalPages: Math.ceil(count / quantity) };
    }

    const { rows: data, count } = await Delivery.findAndCountAll({
      limit: quantity,
      offset: (page - 1) * quantity,
      order: ['updated_at'],
    });

    return { data, count, totalPages: Math.ceil(count / quantity) };
  },
};
