/* eslint-disable no-undef */
import UserUpdateValidator from '../../../src/app/Validators/UserUpdateValidator';

describe('User Store Validator', () => {
  it('Happy Way', async () => {
    const user = {
      name: 'teste',
      password: '123456',
      passwordConfirm: '123456',
    };

    const res = await UserUpdateValidator(
      { body: user },
      {
        status: status => ({
          status,
          json: v => v,
        }),
      },
      () => true
    );

    expect(res).toBe(true);
  });

  it('Should be return errors (required)', async () => {
    const res = await UserUpdateValidator(
      { body: {} },
      {
        status: status => ({
          status,
          json: v => ({ ...v, status }),
        }),
      },
      () => true
    );

    expect(res.status).toBe(400);
    expect(res.error).toBe('Validation fails');
    expect(res.messages.length).toBe(2);
  });

  it('Should be return errors (invalid)', async () => {
    const res = await UserUpdateValidator(
      {
        body: {
          name: '',
          password: true,
          passwordConfirm: false,
        },
      },
      {
        status: status => ({
          status,
          json: v => ({ ...v, status }),
        }),
      },
      () => true
    );

    expect(res.status).toBe(400);
    expect(res.error).toBe('Validation fails');
    expect(res.messages.length).toBe(3);
  });
});
