import Deliveryman from '../Models/Deliveryman';
import Exception from '../Exceptions/ServiceException';

export default {
  async run({ deliverymanId: id }) {
    if (!(await Deliveryman.destroy({ where: { id } }))) {
      throw new Exception('Invalid deliveryman id.');
    }
  },
};
