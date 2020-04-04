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

import authFilter from './app/middlewares/authentication.middleware';
import upload from './app/middlewares/upload.middleware';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.get('/recipients', [authFilter, RecipientController.index]);
routes.get('/recipients/:id', [authFilter, RecipientController.show]);
routes.post('/recipients', [authFilter, RecipientController.store]);
routes.put('/recipients/:id', [authFilter, RecipientController.update]);
routes.delete('/recipients/:id', [authFilter, RecipientController.destroy]);

routes.get('/deliverymen', [authFilter, DeliverymanController.index]);
routes.get('/deliverymen/:id', [authFilter, DeliverymanController.show]);
routes.post('/deliverymen', [authFilter, DeliverymanController.store]);
routes.put('/deliverymen/:id', [authFilter, DeliverymanController.update]);
routes.delete('/deliverymen/:id', [authFilter, DeliverymanController.destroy]);

routes.get('/deliveries', [authFilter, DeliveryController.index]);
routes.get('/deliveries/:id', [authFilter, DeliveryController.show]);
routes.post('/deliveries', [authFilter, DeliveryController.store]);
routes.put('/deliveries/:id', [authFilter, DeliveryController.update]);
routes.delete('/deliveries/:id', [authFilter, DeliveryController.destroy]);
routes.get('/deliveries/:delivery_id/problems', [
  authFilter,
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

routes.get('/problems', [authFilter, ProblemControlller.index]);
routes.post(
  '/deliverymen/:deliveryman_id/deliveries/:delivery_id/problems',
  ProblemControlller.store
);

export default routes;
