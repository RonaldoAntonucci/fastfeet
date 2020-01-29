import factory from './factories';

export default async (request, { isAdmin = false } = {}) => {
  const password = '123456';
  const { email } = await factory.create('User', { password, isAdmin });
  // const is_admin = await factory.create('Admin', { user_id: id });

  const {
    body: { token },
  } = await request.post('/sessions').send({ email, password });
  return token;
};
