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
import SessionStoreValidator from '../App/Validators/SessionStoreValidator';
import RecipientStoreValidator from '../App/Validators/RecipientStoreValidator';
import RecipientUpdateValidator from '../App/Validators/RecipientUpdateValidator';
import DeliveryStoreValidator from '../App/Validators/DeliveryStoreValidator';
import DeliveryUpdateValidator from '../App/Validators/DeliveryUpdateValidator';
import DeliveryWithdrawValidator from '../App/Validators/DeliveryWithdrawValidator';

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

routes.get(
  '/deliverymen/:deliverymanId/deliveries',
  RouteParamsIdValidator(['deliverymanId']),
  DeliveryController.index
);

routes.post(
  '/deliverymen/:deliverymanId/deliveries/:deliveryId/withdraw',
  RouteParamsIdValidator(['deliverymanId', 'deliveryId']),
  DeliveryWithdrawValidator,
  DeliveryController.update
);

routes.post(
  '/deliverymen/:deliverymanId/deliveries/:deliveryId/finish',
  RouteParamsIdValidator(['deliverymanId', 'deliveryId']),
  upload.single('file'),
  FileController.store,
  DeliveryController.update
);

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

routes.get('/deliverymen', isAdminMiddleware, DeliverymanController.index);

routes.get(
  '/deliverymen/:deliverymanId',
  isAdminMiddleware,
  RouteParamsIdValidator(['deliverymanId']),
  DeliverymanController.show
);

routes.post(
  '/deliverymen',
  isAdminMiddleware,
  DeliverymanStoreValidator,
  DeliverymanController.store
);

routes.put(
  '/deliverymen/:deliverymanId',
  isAdminMiddleware,
  RouteParamsIdValidator(['deliverymanId']),
  DeliverymanUpdateValidator,
  DeliverymanController.update
);

routes.post(
  '/deliverymen/:deliverymanId/avatar',
  isAdminMiddleware,
  upload.single('file'),
  FileController.store,
  DeliverymanController.update
);

routes.delete(
  '/deliverymen/:deliverymanId',
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
