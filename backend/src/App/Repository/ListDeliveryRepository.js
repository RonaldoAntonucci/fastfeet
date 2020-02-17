import { Op } from 'sequelize';

import Delivery from '../Models/Delivery';

import Cache from '../../Lib/Cache';

export default {
  async run(
    { deliverymanId },
    { page = 1, quantity = 20, delivered, q: product = '' } = {},
    { url } = {}
  ) {
    const cacheKey = url ? `deliveries:${url}` : false;

    if (cacheKey) {
      const cached = await Cache.get(cacheKey);

      if (cached) {
        return cached;
      }
    }

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
        where: {
          product: {
            [Op.like]: `%${product}%`,
          },
        },
        order: ['updated_at'],
      });

      const result = { data, count, totalPages: Math.ceil(count / quantity) };

      if (cacheKey) {
        Cache.set(cacheKey, result);
      }

      return result;
    }

    const { rows: data, count } = await Delivery.findAndCountAll({
      limit: quantity,
      offset: (page - 1) * quantity,
      order: ['updated_at'],
    });

    const result = { data, count, totalPages: Math.ceil(count / quantity) };

    if (cacheKey) {
      Cache.set(cacheKey, result);
    }

    return result;
  },
};
