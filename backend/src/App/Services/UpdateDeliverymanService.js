import Deliveryman from '../Models/Deliveryman';
import Exception from '../Exceptions/ServiceException';

export default {
  async run({ deliverymanId: id }, { name, avatar_id }) {
    const dialectIsProtgres = process.env.DB_DIALECT === 'postgres';

    const result = await Deliveryman.update(
      { name, avatar_id },
      { where: { id }, returning: dialectIsProtgres }
    );

    // console.log(avatar_id);

    if (result[0] < 1) {
      throw new Exception('Invalid Deliveryman id.');
    }

    if (!dialectIsProtgres) {
      return Deliveryman.findByPk(id);
    }

    return result[1][0];
  },
};
