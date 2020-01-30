import { Router } from 'express';

import authMiddleware from './app/Middlewares/auth';
import isAdminMiddleware from './app/Middlewares/isAdmin';
import parseEmptyBodyToNull from './app/Middlewares/parseEmptyBodyToNull';

import UserStoreValidator from './app/Validators/UserStoreValidator';
import DeliverymanStoreValidator from './app/Validators/DeliverymanStoreValidator';
// import UserUpdateValidator from './app/Validators/UserUpdateValidator';
import SessionStoreValidator from './app/Validators/SessionStoreValidator';
import RecipientStoreValidator from './app/Validators/RecipientStoreValidator';
import RecipientUpdateValidator from './app/Validators/RecipientUpdateValidator';

import UserController from './app/Controllers/UserController';
import DeliverymanController from './app/Controllers/DeliverymanController';
import SessionController from './app/Controllers/SessionController';
import RecipientsController from './app/Controllers/RecipientsController';

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

routes.post(
  '/deliverymans',
  isAdminMiddleware,
  DeliverymanStoreValidator,
  DeliverymanController.store
);

export default routes;
