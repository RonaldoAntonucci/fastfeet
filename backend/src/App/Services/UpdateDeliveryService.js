import Delivery from '../Models/Delivery';
import Deliveryman from '../Models/Deliveryman';

import Exception from '../Exceptions/ServiceException';

export default {
  async run({ deliveryId: id }, { product, deliveryman_id }) {
    const dialectIsProtgres = process.env.DB_DIALECT === 'postgres';

    if (!(await Deliveryman.findByPk(deliveryman_id))) {
      throw new Exception('Invalid Deliveryman id.');
    }

    const result = await Delivery.update(
      { product, deliveryman_id },
      { where: { id }, returning: dialectIsProtgres }
    );

    if (result[0] < 1) {
      throw new Exception('Invalid Delivery id.');
    }

    if (!dialectIsProtgres) {
      return Delivery.findByPk(id);
    }

    return result[1][0];
  },
};
