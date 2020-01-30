import factory from './factories';

export default async (request, { isAdmin = false } = {}) => {
  const password = '123456';
  const { email } = await factory.create('User', { password, isAdmin });

  const {
    body: { token },
  } = await request.post('/sessions').send({ email, password });
  return token;
};
