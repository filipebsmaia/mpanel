import Server from '@app/entities/Server';

export default interface IServerCreator {
  startServer: (
    server: Server,
    io: SocketIO.Server,
    restart?: boolean,
  ) => Promise<void>;
  loadServers: (io: SocketIO.Server) => Promise<void>;
}
