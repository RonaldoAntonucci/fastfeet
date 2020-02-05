import Problem from '../Models/Problem';
import Delivery from '../Models/Delivery';

import Exception from '../Exceptions/ServiceException';

export default {
  async run({ delivery_id, description }) {
    if (!(await Delivery.findByPk(delivery_id))) {
      throw new Exception('Invalid Delivery id.');
    }

    return Problem.create({ delivery_id, description });
  },
};
