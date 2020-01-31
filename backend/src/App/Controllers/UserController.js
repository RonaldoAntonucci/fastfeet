import CreateUser from '../Services/CreateUserService';

export default {
  async store(req, res) {
    return res.json(await CreateUser.run(req.body));
  },
};
