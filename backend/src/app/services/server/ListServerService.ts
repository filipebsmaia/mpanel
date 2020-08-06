import Server from '@app/entities/Server';
import { getRepository } from 'typeorm';

type IResponse = Server;

class ListServerService {
  public async execute(): Promise<IResponse[]> {
    const serversRepository = getRepository(Server);
    const servers = await serversRepository.find();

    return servers;
  }
}

export default ListServerService;
