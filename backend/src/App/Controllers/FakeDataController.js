import Factory from '../../../__tests__/utils/factories';

import Cache from '../../Lib/Cache';

export default {
  async index({ query }, res) {
    if (query.deliveries) {
      await Factory.createMany('Delivery', 100);
    }

    if (query.problems) {
      await Factory.createMany('Problem', 100);
    }

    await Cache.invalidatePrefixes(['*']);
    return res.json({ ok: true });
  },
};
