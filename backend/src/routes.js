import { Router } from 'express';

import authMiddleware from './app/Middlewares/auth';
import parseEmptyBodyToNull from './app/Middlewares/parseEmptyBodyToNull';

import UserStoreValidator from './app/Validators/UserStoreValidator';
// import UserUpdateValidator from './app/Validators/UserUpdateValidator';
import SessionStoreValidator from './app/Validators/SessionStoreValidator';
import RecipientStoreValidator from './app/Validators/RecipientStoreValidator';
import RecipientUpdateValidator from './app/Validators/RecipientUpdateValidator';

import UserController from './app/Controllers/UserController';
import SessionController from './app/Controllers/SessionController';
import RecipientsController from './app/Controllers/RecipientsController';

const routes = new Router();

routes.use(parseEmptyBodyToNull);

routes.post('/users', UserStoreValidator, UserController.store);
routes.post('/sessions', SessionStoreValidator, SessionController.store);

routes.use(authMiddleware);

routes.post('/recipients', RecipientStoreValidator, RecipientsController.store);
routes.put(
  '/recipients/:recipientId',
  RecipientUpdateValidator,
  RecipientsController.update
);

export default routes;
