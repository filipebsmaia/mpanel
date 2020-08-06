import fs from 'fs';
import path from 'path';
import getPort from 'get-port';

import serverConfig from '@config/server';
import IPropertiesListInterface from '@dtos/IPropertiesListInterface';
import IServerOptions from '@dtos/IServerOptions';

import copyDir from './CopyDir';
import unlinkFilesInDirByType from './UnlinkFilesInDirByType';
import { toPropertiesFile, getDefaultProperties } from './ServerProperties';

interface IGenerateServerPropertiesProps {
  server: string;
  options?: IServerOptions;
  properties?: IPropertiesListInterface;
  type: 'lobby';
}

interface IGenerateServerPropertiesInterface {
  data: IPropertiesListInterface;
  directory: string;
}

export default async function generateServer({
  server,
  options,
  properties,
  type,
}: IGenerateServerPropertiesProps): Promise<
  IGenerateServerPropertiesInterface
> {
  const port = await getPort();

  const defaultProperties = getDefaultProperties();
  const defaultDatas = {
    serverIp: '127.0.0.1',
    serverPort: port,
    maxPlayers: 100,
    onlineMode: true,
    viewDistance: 6,
  };
  const data: IPropertiesListInterface = {} as IPropertiesListInterface;
  Object.assign(data, defaultProperties, defaultDatas, properties);

  const dataAsProperties = toPropertiesFile(data);

  const directory = path.resolve(
    serverConfig.serverInstanceFolder,
    String(server),
  );

  const baseServerDirectory = path.resolve(serverConfig.serverBaseFolder, type);

  if (!fs.existsSync(directory)) {
    await fs.promises.mkdir(directory, { recursive: true }); // Create folder if not exits
  }

  if (options?.deletePlugins) {
    await unlinkFilesInDirByType(`${directory}/plugins`, 'jar'); // Remove all plugins
  }

  if (options?.copyDefaultConfig) {
    await copyDir(serverConfig.defaultServerFolder, directory); // Copy default config
  }

  if (options?.copyTemplate) {
    await copyDir(baseServerDirectory, directory); // Copy template base
  }

  await fs.promises.writeFile(
    `${directory}/server.properties`,
    dataAsProperties,
  ); // Write/Rewrite server properties

  return { data, directory };
}
