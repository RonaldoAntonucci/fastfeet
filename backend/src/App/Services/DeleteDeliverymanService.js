import Deliveryman from '../Models/Deliveryman';
import Exception from '../Exceptions/ServiceException';

import Cache from '../../Lib/Cache';

export default {
  async run({ deliverymanId: id }) {
    if (!(await Deliveryman.destroy({ where: { id } }))) {
      throw new Exception('Invalid deliveryman id.');
    }

    await Cache.invalidatePrefixes(['deliverymen']);

    return true;
  },
};
