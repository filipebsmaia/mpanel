import { Router } from 'express';
import SessionsController from '@app/controllers/user/UserSessionsController';

const sessionsController = new SessionsController();

const routes = Router();

routes.post('/', sessionsController.create);

export default routes;
