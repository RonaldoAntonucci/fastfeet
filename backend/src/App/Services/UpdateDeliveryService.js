import { isAfter, isBefore, parseISO } from 'date-fns';
import Delivery from '../Models/Delivery';
import Deliveryman from '../Models/Deliveryman';

import Exception from '../Exceptions/ServiceException';

export default {
  async admin(
    { deliveryId },
    { product, deliveryman_id },
    { dialectIsProtgres }
  ) {
    if (!(await Deliveryman.findByPk(deliveryman_id))) {
      throw new Exception('Invalid Deliveryman id.');
    }

    return Delivery.update(
      { product, deliveryman_id },
      { where: { id: deliveryId }, returning: dialectIsProtgres }
    );
  },

  async deliveryman(
    { deliverymanId, deliveryId },
    { start_date },
    { dialectIsProtgres }
  ) {
    if (!(await Deliveryman.findByPk(deliverymanId))) {
      throw new Exception('Invalid Deliveryman id.');
    }

    const startDate = parseISO(start_date);

    if (isBefore(startDate, new Date().setHours(8, 0, 0))) {
      throw new Exception('Horário não permitido.');
    }

    if (isAfter(startDate, new Date().setHours(18, 0, 0))) {
      throw new Exception('Horário não permitido.');
    }

    return Delivery.update(
      { start_date },
      {
        where: { id: deliveryId, deliveryman_id: deliverymanId },
        returning: dialectIsProtgres,
      }
    );
  },

  async run(
    { deliverymanId, deliveryId },
    { product, deliveryman_id, start_date }
  ) {
    const dialectIsProtgres = process.env.DB_DIALECT === 'postgres';

    const result = deliverymanId
      ? await this.deliveryman(
          { deliverymanId, deliveryId },
          { start_date },
          { dialectIsProtgres }
        )
      : await this.admin(
          { deliveryId },
          { product, deliveryman_id },
          { dialectIsProtgres }
        );

    if (result[0] < 1) {
      throw new Exception('Invalid Delivery id.');
    }

    if (!dialectIsProtgres) {
      return Delivery.findByPk(deliveryId);
    }

    return result[1][0];
  },
};
