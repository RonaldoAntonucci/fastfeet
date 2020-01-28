import CreateUser from '../Services/CreateUserService';

export default {
  async store(req, res) {
    const { id, name, email, updatedAt, createdAt } = await CreateUser.run(
      req.body
    );
    return res.json({
      id,
      name,
      email,
      updatedAt,
      createdAt,
    });
  },
};
