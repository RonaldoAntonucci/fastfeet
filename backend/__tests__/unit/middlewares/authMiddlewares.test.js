/* eslint-disable import/first */
/* eslint-disable no-undef */
jest.mock('../../../src/Config/auth');

import jwt from 'jsonwebtoken';

import authConfig from '../../../src/Config/auth';

import authMiddleware from '../../../src/app/Middlewares/auth';

describe('Create Session Service', () => {
  it('must tokenize the token', async () => {
    authConfig.secret = 'f979ac3c421ea71d4a94cbac15ef5eb2';
    authConfig.expiresIn = '7d';

    const id = '5e2cc2e12db45420819c438c';

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

    expect(await authMiddleware(req, res, next)).toBe(true);
    expect(req.userId).toBe(id);
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
});
