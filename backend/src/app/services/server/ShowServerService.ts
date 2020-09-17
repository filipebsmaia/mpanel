import Server from '@app/entities/Server';
import AppError from '@app/errors/AppError';
import { getRepository } from 'typeorm';

interface IRequest {
  id: string;
}

type IResponse = Server;

class ShowServerService {
  public async execute({ id }: IRequest): Promise<IResponse> {
    const serversRepository = getRepository(Server);
    const server = await serversRepository.findOne(id);

    if (!server) {
      throw new AppError('Server does not exists');
    }

    return server;
  }
}

export default ShowServerService;
