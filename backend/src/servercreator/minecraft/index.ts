import 'colors';
import { getRepository } from 'typeorm';

import Server from '@app/entities/Server';

import pidusage from 'pidusage';
import { defaultServerStatusProps } from 'servercreator/dtos/IServerStatus';
import { updateServer, registerServer } from '..';
import MinecraftServer from './MinecraftServer';

export const startServer = async (
  server: Server,
  io: SocketIO.Server,
  restart?: boolean,
): Promise<void> => {
  const { id, name, port } = server;

  const onReciveData = async (data: string): Promise<void> => {
    io.emit('log', data);
    io.emit(`${server.id}:log`, data);
    if (
      data.includes('Done') &&
      data.includes('For help, type "help" or "?"')
    ) {
      await updateServer({
        data: {
          type: 'minecraft',
          name,
          status: 'started',
        },
      });
    }
  };

  const onExit = async (
    code: number | null,
    signal: string | null,
  ): Promise<void> => {
    if (code === 0) {
      const serverRepository = getRepository(Server);
      const updatedServer = await serverRepository.findOne(server.id);
      if (updatedServer) {
        console.log('Restarting server...'.green); // eslint-disable-line no-console
        await startServer(updatedServer, io);
      }
    } else {
      // eslint-disable-next-line no-console
      console.log(
        'Killed'.red,
        server.name.yellow.bold,
        'with code'.red,
        `${code}`.yellow,
        'as signal'.red,
        `${signal}`.yellow,
      );
    }
  };

  const onErr = async (data: string): Promise<void> => {
    io.emit(`${server.id}:log`, data);
  };

  const { sendData, pid } = await MinecraftServer({
    server,
    onReciveData,
    onExit,
    onErr,
  });

  const stats = await pidusage(pid);

  const data = Object.assign(defaultServerStatusProps, {
    type: 'minecraft',
    sendData,
    onReciveData,
    onExit,
    onErr,

    id,
    name,
    port,
    status: 'starting',

    memory: stats.memory,
    cpu: stats.cpu,
    pid,
  });

  if (restart) {
    await updateServer({ data });
  } else {
    await registerServer({ data });
  }
};

export const startup = async (io: SocketIO.Server): Promise<void> => {
  const serverRepository = getRepository(Server);

  const servers = await serverRepository.find();
  // console.log('Servers available >', servers);
  servers.forEach(async server => {
    if (server.lastpid > 0) {
      if (process.env.NODE_ENV === 'development') {
        try {
          process.kill(server.lastpid);
          // eslint-disable-next-line no-console
          console.log('Killed last server pid ', server.lastpid);
        } catch (err) {
          // console.log(err);
        }
      }
    }
    startServer(server, io);
  });
};

// const directory = path.resolve(
//   serverConfig.serverInstanceFolder,
//   String(25565),
// );
// const s = await serverRepository.create({
//   name: '25565',
//   port: 25565,
//   directory,
// });

// console.log(s);
// await serverRepository.save(s);
