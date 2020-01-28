/* eslint-disable import/first */
/* eslint-disable no-undef */
jest.mock('../../../src/Config/auth');
jest.mock('../../../src/app/Models/User');
import jwt from 'jsonwebtoken';
import User from '../../../src/app/Models/User';

import authConfig from '../../../src/Config/auth';

import authMiddleware from '../../../src/app/Middlewares/auth';

describe('Create Session Service', () => {
  it('must tokenize the token', async () => {
    authConfig.secret = 'f979ac3c421ea71d4a94cbac15ef5eb2';
    authConfig.expiresIn = '7d';

    const id = '1';

    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const res = {};
    const next = () => true;
    User.findOne.mockReturnValue(true);

    expect(await authMiddleware(req, res, next)).toBe(true);
    expect(req.user).toBe(true);
  });

  it('Should return an error without token', async () => {
    const req = { headers: { authorization: 'Bearer InvalidToken' } };
    const res = {
      status: status => ({
        status,
        json: body => ({
          status,
          body,
        }),
      }),
    };
    const next = () => true;

    const result = await authMiddleware(req, res, next);
    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty('error', 'Token invalid');
  });

  it('Should return an error with invalid token', async () => {
    const req = { headers: {} };
    const res = {
      status: status => ({
        status,
        json: body => ({
          status,
          body,
        }),
      }),
    };
    const next = () => true;

    const result = await authMiddleware(req, res, next);
    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty('error', 'Token not provided');
  });

  it('Should return an error with valid token but invalid user id', async () => {
    authConfig.secret = 'f979ac3c421ea71d4a94cbac15ef5eb2';
    authConfig.expiresIn = '7d';

    const id = '1';

    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const res = {
      status: status => ({
        status,
        json: body => ({
          status,
          body,
        }),
      }),
    };
    const next = () => true;
    User.findOne.mockReturnValue(false);

    const result = await authMiddleware(req, res, next);
    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty('error', 'Token invalid');
  });
});
