import CreateRecipiment from '../Services/CreateRecipientService';
import UpdateRecipiment from '../Services/UpdateRecipientService';

export default {
  async store({ body }, res) {
    return res.json(await CreateRecipiment.run(body));
  },

  async update({ body, params: { recipientId } }, res) {
    return res.json(await UpdateRecipiment.run(recipientId, body));
  },
};
