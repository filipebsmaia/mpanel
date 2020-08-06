import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import ListUserService from '@app/services/user/ListUserService';
import InfoUserServices from '@app/services/user/InfoUserServices';
import CreateUserService from '@app/services/user/CreateUserService';
import UpdateProfileService from '@app/services/user/UpdateProfileService';

export default class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUserService = new ListUserService();
    const users = await listUserService.execute();

    return response.json(classToClass(users));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const infoUserServices = new InfoUserServices();
    const user = await infoUserServices.execute({ id });

    return response.json(classToClass(user));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { nickname, password, email } = request.body;

    const createUser = new CreateUserService();
    const user = await createUser.execute({
      nickname,
      email,
      password,
    });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { nickname, email, old_password, password } = request.body;
    const user_id = request.user.id;

    const updateProfileService = new UpdateProfileService();
    const user = await updateProfileService.execute({
      user_id,
      nickname,
      email,
      password,
      old_password,
    });

    return response.json(classToClass(user));
  }
}
