import mcQuery, { IQueryInterface } from 'mc-ping';

interface IQueryParamsInterface {
  address: string;
  port: number;
}

export interface IQueryResponse {
  protocol_version: number;
  minecraft_version: string;
  server_name: string;
  num_players: number;
  max_players: number;
}

export default async ({
  address,
  port,
}: IQueryParamsInterface): Promise<IQueryResponse> => {
  const query = (): Promise<IQueryInterface> => {
    return new Promise((resolve, reject) => {
      mcQuery(
        address,
        port,
        (err: undefined, data: IQueryInterface): void => {
          if (err) {
            return reject(err);
          }
          return resolve(data);
        },
        1000,
      );
    });
  };
  const response = await query();
  const { num_players, max_players } = response;

  const parsedResponse = Object.assign(response, {
    num_players: Number(num_players),
    max_players: Number(max_players),
  });
  return parsedResponse;
};
