export default interface IServerOptions {
  deletePlugins?: boolean;
  copyDefaultConfig?: boolean;
  copyTemplate?: boolean;
}

export const defaultServerOptions: IServerOptions = {
  deletePlugins: true,
  copyDefaultConfig: true,
  copyTemplate: true,
};
