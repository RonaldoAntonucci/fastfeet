import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../Config/multer';

import authMiddleware from '../App/Middlewares/auth';
import isAdminMiddleware from '../App/Middlewares/isAdmin';
import parseEmptyBodyToNull from '../App/Middlewares/parseEmptyBodyToNull';

import RouteParamsIdValidator from '../App/Validators/RouteParamsIdValidator';
import UserStoreValidator from '../App/Validators/UserStoreValidator';
import DeliverymanStoreValidator from '../App/Validators/DeliverymanStoreValidator';
import DeliverymanUpdateValidator from '../App/Validators/DeliverymanUpdateValidator';
// import UserUpdateValidator from './app/Validators/UserUpdateValidator';
import SessionStoreValidator from '../App/Validators/SessionStoreValidator';
import RecipientStoreValidator from '../App/Validators/RecipientStoreValidator';
import RecipientUpdateValidator from '../App/Validators/RecipientUpdateValidator';
import DeliveryStoreValidator from '../App/Validators/DeliveryStoreValidator';
import DeliveryUpdateValidator from '../App/Validators/DeliveryUpdateValidator';

import UserController from '../App/Controllers/UserController';
import DeliverymanController from '../App/Controllers/DeliverymanController';
import SessionController from '../App/Controllers/SessionController';
import RecipientsController from '../App/Controllers/RecipientsController';
import DeliveryController from '../App/Controllers/DeliveryController';
import FileController from '../App/Controllers/FileController';

const routes = new Router();
const upload = multer(multerConfig);

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
  RouteParamsIdValidator(['recipientId']),
  RecipientUpdateValidator,
  RecipientsController.update
);

routes.get('/deliverymans', isAdminMiddleware, DeliverymanController.index);

routes.get(
  '/deliverymans/:deliverymanId',
  isAdminMiddleware,
  RouteParamsIdValidator(['deliverymanId']),
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
  RouteParamsIdValidator(['deliverymanId']),
  DeliverymanUpdateValidator,
  DeliverymanController.update
);

routes.post(
  '/deliverymans/:deliverymanId/avatar',
  isAdminMiddleware,
  upload.single('file'),
  FileController.store,
  DeliverymanController.update
);

routes.delete(
  '/deliverymans/:deliverymanId',
  isAdminMiddleware,
  RouteParamsIdValidator(['deliverymanId']),
  DeliverymanController.delete
);

routes.get('/deliveries', isAdminMiddleware, DeliveryController.index);
routes.get(
  '/deliveries/:deliveryId',
  isAdminMiddleware,
  RouteParamsIdValidator(['deliveryId']),
  DeliveryController.show
);

routes.post(
  '/deliveries',
  isAdminMiddleware,
  DeliveryStoreValidator,
  DeliveryController.store
);

routes.put(
  '/deliveries/:deliveryId',
  isAdminMiddleware,
  RouteParamsIdValidator(['deliveryId']),
  DeliveryUpdateValidator,
  DeliveryController.update
);

routes.delete(
  '/deliveries/:deliveryId',
  isAdminMiddleware,
  RouteParamsIdValidator(['deliveryId']),
  DeliveryController.delete
);

export default routes;
