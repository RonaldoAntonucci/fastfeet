import CreateRecipiment from '../Services/CreateRecipientService';

export default {
  async store({ body }, res) {
    return res.json(await CreateRecipiment.run(body));
  },
};
