import Delivery from '../Models/Delivery';
import Exception from '../Exceptions/ServiceException';

export default {
  async run({ deliveryId }) {
    const delivery = await Delivery.findByPk(deliveryId, {
      attributes: ['id', 'start_date'],
    });

    if (!delivery) {
      throw new Exception('Invalid Delivery id.');
    }

    if (delivery.start_date) {
      throw new Exception('Started deliveries cannot be excluded.');
    }

    return delivery.destroy({ paranoid: false, force: true });
  },
};
