import { Router } from 'express';

import authMiddleware from './app/Middlewares/auth';

import UserStoreValidator from './app/Validators/UserStoreValidator';
// import UserUpdateValidator from './app/Validators/UserUpdateValidator';
import SessionStoreValidator from './app/Validators/SessionStoreValidator';

import UserController from './app/Controllers/UserController';
import SessionController from './app/Controllers/SessionController';

const routes = new Router();

routes.post('/users', UserStoreValidator, UserController.store);
routes.post('/sessions', SessionStoreValidator, SessionController.store);

routes.use(authMiddleware);

export default routes;
