import factory from './factories';

export default async request => {
  const password = '123456';
  const { email } = await factory.create('User', { password });

  const {
    body: { token },
  } = await request.post('/sessions').send({ email, password });
  return token;
};
