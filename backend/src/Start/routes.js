import { Router } from 'express';

import authMiddleware from '../App/Middlewares/auth';
import isAdminMiddleware from '../App/Middlewares/isAdmin';
import parseEmptyBodyToNull from '../App/Middlewares/parseEmptyBodyToNull';

import UserStoreValidator from '../App/Validators/UserStoreValidator';
import DeliverymanStoreValidator from '../App/Validators/DeliverymanStoreValidator';
import DeliverymanUpdateValidator from '../App/Validators/DeliverymanUpdateValidator';
// import UserUpdateValidator from './app/Validators/UserUpdateValidator';
import SessionStoreValidator from '../App/Validators/SessionStoreValidator';
import RecipientStoreValidator from '../App/Validators/RecipientStoreValidator';
import RecipientUpdateValidator from '../App/Validators/RecipientUpdateValidator';

import UserController from '../App/Controllers/UserController';
import DeliverymanController from '../App/Controllers/DeliverymanController';
import SessionController from '../App/Controllers/SessionController';
import RecipientsController from '../App/Controllers/RecipientsController';

const routes = new Router();

routes.use(parseEmptyBodyToNull);

routes.post('/users', UserStoreValidator, UserController.store);
routes.post('/sessions', SessionStoreValidator, SessionController.store);

routes.use(authMiddleware);

routes.post(
  '/recipients',
  isAdminMiddleware,
  RecipientStoreValidator,
  RecipientsController.store
);

routes.put(
  '/recipients/:recipientId',
  isAdminMiddleware,
  RecipientUpdateValidator,
  RecipientsController.update
);

routes.get('/deliverymans', isAdminMiddleware, DeliverymanController.index);

routes.get(
  '/deliverymans/:deliverymanId',
  isAdminMiddleware,
  DeliverymanController.show
);

routes.post(
  '/deliverymans',
  isAdminMiddleware,
  DeliverymanStoreValidator,
  DeliverymanController.store
);

routes.put(
  '/deliverymans/:deliverymanId',
  isAdminMiddleware,
  DeliverymanUpdateValidator,
  DeliverymanController.update
);

routes.delete(
  '/deliverymans/:deliverymanId',
  isAdminMiddleware,
  DeliverymanController.destroy
);

export default routes;
