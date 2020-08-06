declare namespace Express {
  export interface SocketUser {
    [_: string]: string;
  }
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  export interface Request {
    io: SocketIO.Server;
    connectedUsers: SocketUser;
    user: {
      id: string;
    };
  }
}
