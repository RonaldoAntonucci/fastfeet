import Factory from '../../../__tests__/utils/factories';

import Cache from '../../Lib/Cache';

export default {
  async index(req, res) {
    await Cache.invalidatePrefixes(['*']);
    return res.json(await Factory.createMany('Delivery', 100));
  },
};
