import path from 'path';

const rootFolder = path.resolve(__dirname, '..', '..');

const tmpFolder = path.resolve(rootFolder, 'tmp');
const serverInstanceFolder = path.resolve(tmpFolder, 'servers');

const serverBaseFolder = path.resolve(rootFolder, 'servers', 'types');
const defaultServerFolder = path.resolve(serverBaseFolder, 'default');

interface IServerConfig {
  rootFolder: string;
  serverBaseFolder: string;
  tmpFolder: string;
  serverInstanceFolder: string;
  defaultServerFolder: string;
}

export default {
  rootFolder,
  serverBaseFolder,
  tmpFolder,
  serverInstanceFolder,
  defaultServerFolder,
} as IServerConfig;
