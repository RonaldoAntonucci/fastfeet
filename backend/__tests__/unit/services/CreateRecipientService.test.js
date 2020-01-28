/* eslint-disable import/first */
/* eslint-disable no-undef */
jest.mock('../../../src/app/Models/Recipient');

import { factory } from '../../utils';
import CreateRecipientService from '../../../src/app/Services/CreateRecipientService';

import Recipient from '../../../src/app/Models/Recipient';

describe('Create Recipient Service', () => {
  it('Should be able to create Recipient', async () => {
    const recipient = await factory.attrs('Recipient');

    Recipient.create.mockResolvedValue({
      ...recipient,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const { name, street, number, complement, state, city, zip } = recipient;

    const result = await CreateRecipientService.run(recipient);
    expect(result).toHaveProperty('name', name);
    expect(result).toHaveProperty('street', street);
    expect(result).toHaveProperty('number', number);
    expect(result).toHaveProperty('complement', complement);
    expect(result).toHaveProperty('state', state);
    expect(result).toHaveProperty('city', city);
    expect(result).toHaveProperty('zip', zip);
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');
  });
});
