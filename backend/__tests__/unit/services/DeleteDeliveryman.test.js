/* eslint-disable import/first */
/* eslint-disable no-undef */
jest.mock('../../../src/App/Models/Deliveryman');

import DeleteDeliverymanService from '../../../src/App/Services/DeleteDeliverymanService';

import Deliveryman from '../../../src/App/Models/Deliveryman';

describe('Delete Deliveryman Service', () => {
  it('Should be able to update Deliveryman (not postgres)', async () => {
    try {
      Deliveryman.destroy.mockResolvedValue(true);
      await DeleteDeliverymanService.run({});
      expect(true).toBe(true);
    } catch (err) {
      expect('ocorreu um erro.').toBe('nao ocorra erro.');
    }
  });

  it('Should not be update a Deliveryman with invalid id (not postgres)', async () => {
    try {
      Deliveryman.destroy.mockResolvedValue(false);
      await DeleteDeliverymanService.run({});
      expect('ocorreu um erro.').toBe('ocorra erro.');
    } catch (err) {
      expect(err.message).toBe('Invalid deliveryman id.');
    }
  });
});
