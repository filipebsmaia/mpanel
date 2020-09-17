import { Router } from 'express';
import UserController from '@app/controllers/user/UserController';

const userController = new UserController();

const routes = Router();

routes.get('/', userController.index);
routes.get('/:id', userController.show);

routes.post('/', userController.create);
routes.put('/', userController.update);

export default routes;
