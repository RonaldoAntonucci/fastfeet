import Deliveryman from '../Models/Deliveryman';
import File from '../Models/File';

import Exception from '../Exceptions/ServiceException';

import Cache from '../../Lib/Cache';

export default {
  async run({ deliverymanId: id }, { name, avatar_id }) {
    const dialectIsProtgres = process.env.DB_DIALECT === 'postgres';

    if (avatar_id && !(await File.findByPk(avatar_id))) {
      throw new Exception('Invalid File id.');
    }

    const result = await Deliveryman.update(
      { name, avatar_id },
      { where: { id }, returning: dialectIsProtgres }
    );

    if (result[0] < 1) {
      throw new Exception('Invalid Deliveryman id.');
    }

    await Cache.invalidatePrefixes(['deliverymen']);

    if (!dialectIsProtgres) {
      return Deliveryman.findByPk(id);
    }

    return result[1][0];
  },
};
