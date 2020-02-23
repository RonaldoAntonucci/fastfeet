import CreateRecipiment from '../Services/CreateRecipientService';
import UpdateRecipiment from '../Services/UpdateRecipientService';

import ListRecipient from '../Repository/ListRecipientRepository';

import Recipient from '../Models/Recipient';

export default {
  async index({ query, url }, res) {
    return res.json(await ListRecipient.run(query, { url }));
  },
  async show({ params: { recipientId } }, res) {
    return res.json(await Recipient.findByPk(recipientId));
  },
  async store({ body }, res) {
    return res.json(await CreateRecipiment.run(body));
  },

  async update({ body, params }, res) {
    return res.json(await UpdateRecipiment.run(params, body));
  },
};
