/* eslint-disable no-console */
import { spawn } from 'child_process';

import IPropertiesListInterface from '@dtos/IPropertiesListInterface';
import generateServer from '@util/ServerGenerator';
import { defaultServerOptions } from '@dtos/IServerOptions';
import Server from '@app/entities/Server';

interface ICreateServerProps {
  server: Server;
  onReciveData(data: string): Promise<void>;
  onExit(code: number | null, signal: string | null): Promise<void>;
  onErr(data: string): Promise<void>;
}

interface ICreateServer {
  properties: IPropertiesListInterface;
  sendData(data: string): void;
  pid: number;
}

export default async function MinecraftServer({
  server,
  onReciveData,
  onExit,
  onErr,
}: ICreateServerProps): Promise<ICreateServer> {
  const options = defaultServerOptions; // parse server and template options using object.assing

  const { data: properties, directory } = await generateServer({
    server: server.name,
    options,
    properties: {
      onlineMode: false,
      serverPort: server.port,
    },
    type: 'lobby',
  });

  const child = spawn(
    'java',
    ['-jar', `-Xmx${server.memory}M`, '-Xms1M', `${server.jarfile}`],
    {
      cwd: directory,
    },
  );

  process.on('exit', () => {
    console.log('killed server', ' ', ' ');
    child.kill();
  });

  child.stdout.setEncoding('utf8');

  child.stdout.on('data', data => {
    const message = String(data);
    onReciveData(message);
  });

  child.stderr.on('data', data => {
    const err = String(data);
    onErr(String(err));
  });

  child.on('exit', (code, signal) => {
    onExit(code, signal);
  });

  const sendData = (data: string): void => {
    child.stdin.write(`${data}\n`);
  };

  return { sendData, properties, pid: child.pid };
}
