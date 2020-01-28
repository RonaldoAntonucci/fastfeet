import { Router } from 'express';

import authMiddleware from './app/Middlewares/auth';

// import UserStoreValidator from './app/Validators/UserStoreValidator';
// import UserUpdateValidator from './app/Validators/UserUpdateValidator';
// import SessionStoreValidator from './app/Validators/SessionStoreValidator';

const routes = new Router();

routes.post('/', () => 'hellow');

routes.use(authMiddleware);

export default routes;
