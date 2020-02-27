import Deliveryman from '../Models/Deliveryman';
import File from '../Models/File';

import Exception from '../Exceptions/ServiceException';

// import Cache from '../../Lib/Cache';

export default {
  async run({ deliverymanId: id }, { name, avatar_id }) {
    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      throw new Exception('Invalid Deliveryman id.');
    }

    if (avatar_id) {
      const avatar = await File.findByPk(avatar_id);

      if (!avatar) {
        throw new Exception('Invalid File id.');
      }
      deliveryman.avatar = avatar;
    }

    return deliveryman.update({ name });
  },
};
