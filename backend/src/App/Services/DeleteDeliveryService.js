import Delivery from '../Models/Delivery';
import Exception from '../Exceptions/ServiceException';

export default {
  async run({ deliveryId: id }) {
    if (!(await Delivery.destroy({ where: { id } }))) {
      throw new Exception('Invalid Delivery id.');
    }
  },
};
