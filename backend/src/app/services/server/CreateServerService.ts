import Server from '@app/entities/Server';
import path from 'path';
import serverConfig from '@config/server';
import { getRepository } from 'typeorm';

interface IRequest {
  name: string;
  port: number;
  autostart: boolean;
  crashrestart: boolean;
  maxplayers: number;
  memory: number;
  file: string;
}

type IResponse = Server;

class CreateServerService {
  public async execute({
    name,
    port,
    autostart,
    crashrestart,
    maxplayers,
    memory,
    file,
  }: IRequest): Promise<IResponse> {
    const serversRepository = getRepository(Server);

    const server = await serversRepository.save(
      serversRepository.create({
        name,
        port,
        autostart,
        crashrestart,
        maxplayers,
        memory,
        file,
      }),
    );

    const directory = path.resolve(
      serverConfig.serverInstanceFolder,
      String(server.id),
    );

    server.directory = directory;
    await serversRepository.save(server);

    return server;
  }
}

export default CreateServerService;
