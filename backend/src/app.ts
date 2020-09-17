import 'dotenv/config';

import express, {
  Application,
  Request,
  Response,
  NextFunction,
  Express,
} from 'express';
import io from 'socket.io';
import { createServer, Server } from 'http';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import AppError from '@app/errors/AppError';
import createConnection from '@config/database';

import routes from './routes';
import initializeServers from './servercreator';

export class App {
  public app: Application;

  public server: Server;

  public io: SocketIO.Server;

  public connectedUsers: Express.SocketUser = {};

  constructor() {
    this.app = express();
    this.server = createServer(this.app);

    createConnection.then(() => {
      this.setup();
      this.socket();
      this.initialize();
      this.servers();
    });
  }

  setup(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  initialize(): void {
    this.app.use(routes);

    this.app.use(errors());
    this.app.use(
      (err: Error, request: Request, response: Response, _: NextFunction) => {
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
          });
        }

        // eslint-disable-next-line no-console
        console.error(err);

        return response.status(500).json({
          status: 'error',
          message: 'Internal server error',
        });
      },
    );
  }

  socket(): void {
    this.io = io(this.server);

    this.io.on('connection', socket => {
      const { user_id } = socket.handshake.query;
      this.connectedUsers[user_id] = socket.id;

      socket.on('disconnect', socket => {
        delete this.connectedUsers[user_id];
      });
    });

    this.app.use((request: Request, response: Response, next) => {
      request.io = this.io;
      request.connectedUsers = this.connectedUsers;

      next();
    });
  }

  servers(): void {
    const startServer = async (): Promise<void> => {
      console.log('Starting minecraft...');
      await initializeServers(this.io);

      console.log('Started minecraft servers!');

      // const { sendData } = await MinecraftServer({
      //   options: {
      //     deletePlugins: true,
      //     copyDefaultConfig: true,
      //     copyTemplate: true,
      //   },
      //   onReciveData: (data: string) => {
      //     console.log(data);
      //     app.io.emit('log', data);
      //   },
      // });
      // sendData('say test');
    };

    startServer();
  }
}

export default App;
