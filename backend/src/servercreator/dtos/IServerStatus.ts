export default interface IServerStatus {
  onReciveData?: (data: string) => Promise<void>;
  onExit?(code: number | null, signal: string | null): Promise<void>;
  onErr?(data: string): Promise<void>;
  sendData?(data: string): void;

  name: string;
  id: string;
  port: number;
  status: 'offline' | 'starting' | 'started';

  memory: number;
  freeMemory: number;
  totalMemory: number;
  todayMaxMemory: number;

  cpu: number;

  onlinePlayers: number;
  maxPlayers: number;
  todayMaxPlayers: number;

  pid: number;
  type: 'minecraft' | 'bungeecord' | 'unknown';
}

export const defaultServerStatusProps: IServerStatus = {
  name: 'default',
  id: '-1',
  port: -1,
  status: 'offline',

  memory: 0,
  freeMemory: 0,
  totalMemory: 0,
  todayMaxMemory: 0,

  cpu: 0,

  onlinePlayers: 0,
  maxPlayers: 0,
  todayMaxPlayers: 0,

  pid: -1,
  type: 'unknown',
};
