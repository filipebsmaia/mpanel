import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import ListServerService from '@app/services/server/ListServerService';
import CreateServerService from '@app/services/server/CreateServerService';
import ShowServerService from '@app/services/server/ShowServerService';

export default class ServerController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listServerService = new ListServerService();
    const servers = await listServerService.execute();

    return response.json(classToClass(servers));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showServerService = new ShowServerService();
    const server = await showServerService.execute({ id });

    return response.json(classToClass(server));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      port,
      autostart,
      crashrestart,
      maxplayers,
      memory,
      file,
    } = request.body;

    const createServerService = new CreateServerService();
    const server = await createServerService.execute({
      name,
      port,
      autostart,
      crashrestart,
      maxplayers,
      memory,
      file,
    });

    return response.json(classToClass(server));
  }
}
