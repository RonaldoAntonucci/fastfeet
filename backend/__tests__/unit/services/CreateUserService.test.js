/* eslint-disable import/first */
/* eslint-disable no-undef */
jest.mock('../../../src/app/Schemas/UserSchema');
import CreateUserService from '../../../src/app/Services/CreateUserService';
import User from '../../../src/app/Schemas/UserSchema';
import { factory } from '../../utils';

describe('Create User Service', () => {
  it('Should be create an User', async () => {
    const { name, email, password } = await factory.attrs('User');
    User.create.mockResolvedValue({
      name,
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    User.findOne.mockResolvedValue(false);

    const newUser = await CreateUserService.run({
      name,
      email,
      password,
    });

    expect(newUser).toHaveProperty('name', name);
    expect(newUser).toHaveProperty('email', email);
    expect(newUser).toHaveProperty('createdAt');
    expect(newUser).toHaveProperty('updatedAt');
  });

  it('Should not be create an User with used email', async () => {
    try {
      User.findOne.mockResolvedValue(true);
      await CreateUserService.run({});
      expect(false).toBe(error);
    } catch (err) {
      expect(err.message).toBe('User Email already in use.');
    }
  });
});
