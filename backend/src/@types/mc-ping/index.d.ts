declare module 'mc-ping' {
  export interface IQueryInterface {
    protocol_version: number;
    minecraft_version: string;
    server_name: string;
    num_players: string;
    max_players: string;
  }

  export default function mcping(
    address,
    port,
    callback: (err: undefined, data: IQueryInterface) => void,
    timeout,
  ): IQueryInterface;
}
