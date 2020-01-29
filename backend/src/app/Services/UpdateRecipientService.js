import Recipient from '../Models/Recipient';
import Exception from '../Exceptions/ServiceException';

export default {
  async run(id, { name, street, number, complement, state, city, zip }) {
    const dialectIsProtgres = process.env.DB_DIALECT === 'postgres';
    const result = await Recipient.update(
      {
        name,
        street,
        number,
        complement,
        state,
        city,
        zip,
      },
      { where: { id }, returning: dialectIsProtgres }
    );

    if (!dialectIsProtgres) {
      if (result[1] < 1) {
        throw new Exception('Invalid Recipient id.');
      }
      return Recipient.findByPk(id);
    }

    return result[1][0];
  },
};
