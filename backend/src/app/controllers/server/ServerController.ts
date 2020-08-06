import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import ListServerService from '@app/services/server/ListServerService';

export default class ServerController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listServerService = new ListServerService();
    const servers = await listServerService.execute();

    return response.json(classToClass(servers));
  }
}
