import { getRepository } from 'typeorm';
import Server from '@app/entities/Server';
import pidusage from 'pidusage';
import os from 'os';
import osUtils from 'os-utils';
import serverQuery from '@util/ServerQuery';
import IServerStatusList from './dtos/IServerStatusList';
import IServerStatus from './dtos/IServerStatus';
import * as minecraft from './minecraft';
import getMax from '../util/getMax';

interface IGlobalStatus {
  cpu: number[];

  memory: number;
  freeMemory: number;
  totalMemory: number;

  onlinePlayers: number;
  maxPlayers: number;
  todayMaxPlayers: number;
}

export interface IServerUpdateProps {
  data: RemoveOptional<Partial<IServerStatus>, 'name'>;
}

export interface IServerRegisterProps {
  data: IServerStatus;
}

// export interface IServerRegisterProps {
//   data: RemoveOptional<
//     IServerStatus,
//     'type' | 'id' | 'pid' | 'onReciveData' | 'onExit' | 'onErr' | 'sendData'
//   >;
// }

const globalStatus: IGlobalStatus = {
  cpu: [],

  memory: 0,
  freeMemory: 0,
  totalMemory: 0,

  onlinePlayers: 0,
  maxPlayers: 0,
  todayMaxPlayers: 0,
};

const servers: IServerStatusList = {};

const sendServersData = async (io: SocketIO.Server): Promise<void> => {
  setTimeout(async () => {
    const { cpu, todayMaxPlayers } = globalStatus;
    if (cpu.length > 100) {
      cpu.shift();
    }
    const memory = os.totalmem() - os.freemem();
    const freeMemory = os.freemem();
    const totalMemory = os.totalmem();

    const global = {
      onlinePlayers: 0,
      maxPlayers: 0,
      cpu,
      memory,
      freeMemory,
      totalMemory,
    } as IGlobalStatus;

    osUtils.cpuUsage(usage => {
      global.cpu.push(usage * 100);
    });

    await Promise.all(
      Object.values(servers).map(async ({ name, pid, port }) => {
        if (pid) {
          const stats = await pidusage(pid);
          let query;

          try {
            query = await serverQuery({ address: '127.0.0.1', port });
          } catch (err) {
            if (err.code !== 'ECONNREFUSED') console.error(err); // eslint-disable-line no-console
          }

          const server: IServerStatus = Object.assign(servers[name], {
            memory: stats.memory,
            cpu: stats.cpu,
            onlinePlayers: query?.num_players || 0,
            maxPlayers: query?.max_players || 0,
          } as IServerStatus);

          // Update a Global Status
          global.onlinePlayers += server.onlinePlayers;
          global.maxPlayers += server.maxPlayers;

          io.emit(`${server.id}:status`, JSON.stringify(server));

          servers[name] = server;
        }
      }),
    );

    Object.assign(globalStatus, global, {
      todayMaxPlayers: getMax(todayMaxPlayers, global.onlinePlayers),
    });

    console.log(globalStatus);

    io.emit(`status`, JSON.stringify(globalStatus));

    sendServersData(io); // re run after timeout
  }, 1000);
};

export default async function startup(io: SocketIO.Server): Promise<void> {
  await minecraft.startup(io);
  sendServersData(io);
}

export async function updateServer({
  data,
}: IServerUpdateProps): Promise<void> {
  const server = servers[data.name];
  servers[data.name] = Object.assign(server, data);
}

export async function registerServer({
  data,
}: IServerRegisterProps): Promise<void> {
  servers[data.name] = data;

  const serverRepository = getRepository(Server);
  const server = await serverRepository.findOne(data.id);
  if (server) {
    server.lastpid = data.pid;
    await serverRepository.save(server);
  } else {
    throw new Error(
      `Failded to register server ${data.name} in servercreator because server does not exists`,
    );
  }
}
