import Delivery from '../Models/Delivery';
import Deliveryman from '../Models/Deliveryman';
import Recipient from '../Models/Recipient';
import Exception from '../Exceptions/ServiceException';

export default {
  async run({ product, recipient_id, deliveryman_id }) {
    if (!(await Deliveryman.findByPk(deliveryman_id))) {
      throw new Exception('Invalid Deliveryman id.');
    }

    if (!(await Recipient.findByPk(recipient_id))) {
      throw new Exception('Invalid Recipient id.');
    }

    return Delivery.create({
      product,
      recipient_id,
      deliveryman_id,
    });
  },
};
