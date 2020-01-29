/* eslint-disable import/first */
/* eslint-disable no-undef */
jest.mock('../../../src/app/Models/User');
jest.mock('../../../src/Config/auth');

import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { factory } from '../../utils';

import User from '../../../src/app/Models/User';

import CreateSessionService from '../../../src/app/Services/CreateSessionService';

describe('Create Session Service', () => {
  it('Should be create a Session', async () => {
    const { name, email, password } = await factory.attrs('User');
    const id = '5e2cc2e12db45420819c438c';

    User.findOne.mockResolvedValue({
      id,
      name,
      checkPassword: () => true,
    });

    const newSession = await CreateSessionService.run({
      email,
      password,
    });

    expect(newSession).toHaveProperty('user', { email, name });
    expect(newSession).toHaveProperty('token');

    const { token } = newSession;
    const decoded = await promisify(jwt.verify)(
      token,
      'f979ac3c421ea71d4a94cbac15ef5eb2'
    );

    expect(id).toBe(decoded.id);
  });

  it('Should not be create an Session without valid user', async () => {
    try {
      User.findOne.mockResolvedValue(false);
      await CreateSessionService.run({});
    } catch (err) {
      expect(err.message).toBe('User not found.');
    }
  });

  it('Should not be create an Session without valid password', async () => {
    try {
      User.findOne.mockResolvedValue({ checkPassword: () => false });
      await CreateSessionService.run({});
    } catch (err) {
      expect(err.message).toBe('Password does not match.');
    }
  });
});
