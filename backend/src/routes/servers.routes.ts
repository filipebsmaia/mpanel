import { Router } from 'express';
import ServerController from '@app/controllers/server/ServerController';

const serverController = new ServerController();

const routes = Router();

routes.get('/', serverController.index);
routes.get('/:id', serverController.show);
routes.post('/', serverController.create);

export default routes;
