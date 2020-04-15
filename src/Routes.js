import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import OrderController from './app/controllers/OrderController';
import CollectController from './app/controllers/CollectController';
import DeliverController from './app/controllers/DeliverController';
import ProblemControlller from './app/controllers/ProblemController';
import DeliveryProblemControlller from './app/controllers/DeliveryProblemController';
import AvatarController from './app/controllers/AvatarController';

import { deliverySchema } from './app/validators/DeliveryValidator';
import { deliverymanSchema } from './app/validators/DeliverymanValidator';
import { problemSchema } from './app/validators/ProblemValidator';
import { recipientSchema } from './app/validators/RecipientValidator';
import { sessionSchema } from './app/validators/SessionValidator';

import auth from './app/middlewares/authentication.middleware';
import upload from './app/middlewares/upload.middleware';
import validate from './app/middlewares/validator.middleware';
import brute from './app/middlewares/brute-force.middleware';

const routes = new Router();

routes.post('/sessions', [
  brute.prevent,
  validate(sessionSchema),
  SessionController.store,
]);

routes.get('/recipients', [auth, RecipientController.index]);
routes.get('/recipients/:id', [auth, RecipientController.show]);
routes.post('/recipients', [
  auth,
  validate(recipientSchema),
  RecipientController.store,
]);
routes.put('/recipients/:id', [
  auth,
  validate(recipientSchema),
  RecipientController.update,
]);
routes.delete('/recipients/:id', [auth, RecipientController.destroy]);

routes.get('/deliverymen', [auth, DeliverymanController.index]);
routes.get('/deliverymen/:id', [DeliverymanController.show]);
routes.post('/deliverymen', [auth, DeliverymanController.store]);
routes.put('/deliverymen/:id', [auth, DeliverymanController.update]);
routes.delete('/deliverymen/:id', [auth, DeliverymanController.destroy]);

routes.get('/deliveries', [auth, DeliveryController.index]);
routes.get('/deliveries/:id', [auth, DeliveryController.show]);
routes.post('/deliveries', [
  auth,
  validate(deliverySchema),
  DeliveryController.store,
]);
routes.put('/deliveries/:id', [
  auth,
  validate(deliverymanSchema),
  DeliveryController.update,
]);
routes.delete('/deliveries/:id', [auth, DeliveryController.destroy]);
routes.get('/deliveries/:delivery_id/problems', [
  DeliveryProblemControlller.index,
]);

routes.get('/deliverymen/:deliveryman_id/orders', OrderController.index);
routes.get(
  '/deliverymen/:deliveryman_id/orders/:order_id',
  OrderController.show
);

routes.post(
  '/deliverymen/:deliveryman_id/orders/:order_id/collect',
  CollectController.store
);

routes.post('/deliverymen/:deliveryman_id/orders/:order_id/deliver', [
  upload.single('file'),
  DeliverController.store,
]);

routes.get('/problems', [auth, ProblemControlller.index]);
routes.post('/deliverymen/:deliveryman_id/deliveries/:delivery_id/problems', [
  validate(problemSchema),
  ProblemControlller.store,
]);

routes.post('/avatars', [auth, upload.single('file'), AvatarController.store]);

export default routes;
