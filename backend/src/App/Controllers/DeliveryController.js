import Delivery from '../Models/Delivery';
// import Deliveryman from '../Models/Deliveryman';
// import Recipient from '../Models/Recipient';

export default {
  async store({ params, body }, res) {
    const { deliverymanId: deliveryman_id } = params;
    const { recipient_id, product } = body;

    const delivery = await Delivery.create({
      deliveryman_id,
      recipient_id,
      product,
    });
    return res.json(delivery).send();
  },
};
