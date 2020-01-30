import Deliveryman from '../Models/Deliveryman';
import Exception from '../Exceptions/ServiceException';

export default {
  async run({ name, email, avatar_id }) {
    Deliveryman.findOne();
    if (await Deliveryman.findOne({ where: { email } })) {
      throw new Exception('Deliveryman Email already in use.');
    }

    return Deliveryman.create({ name, email, avatar_id });
  },
};
