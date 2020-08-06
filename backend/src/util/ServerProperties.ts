import IPropertiesListInterface from '@dtos/IPropertiesListInterface';

function convertToProperties(str: string): string {
  return str.replace(/[A-Z]/g, match => {
    return `-${match.toLowerCase()}`;
  });
}

export function getDefaultProperties(): IPropertiesListInterface {
  return {
    spawnProtection: 16,
    maxTickTime: 60000,
    generatorSettings: 'default',
    syncChunkWrites: true,
    forceGamemode: false,
    allowNether: true,
    enforceWhitelist: false,
    gamemode: 'survival',
    broadcastConsoleToOps: true,
    enableQuery: false,
    'query.port': 25565,
    playerIdleTimeout: 0,
    difficulty: 'easy',
    broadcastRconToOps: true,
    spawnMonsters: true,
    opPermissionLevel: 4,
    pvp: true,
    snooperEnabled: true,
    levelType: 'default',
    hardcore: false,
    enableCommandBlock: false,
    networkCompressionThreshold: 256,
    maxPlayers: 20,
    maxWorldSize: 29999984,
    resourcePackSha1: '',
    functionPermissionLevel: 2,
    serverPort: 25565,
    serverIp: '0.0.0.0',
    spawnNpcs: true,
    allowFlight: false,
    levelName: 'world',
    viewDistance: 10,
    resourcePack: '',
    spawnAnimals: true,
    whiteList: false,
    generateStructures: true,
    onlineMode: true,
    maxNuildHeight: 256,
    levelSeed: '',
    preventProxyConnections: false,
    useNativeTransport: true,
    motd: 'A Minecraft Server',
    enableRcon: false,
    'rcon.port': 25575,
    'rcon.password': '',
  };
}

export function getProperties(
  properties: IPropertiesListInterface,
): IPropertiesListInterface {
  const data = getDefaultProperties();
  Object.assign(data, properties);
  return data;
}

export function toPropertiesFile(properties: IPropertiesListInterface): string {
  let data = `#Automated Generation`;
  Object.entries(properties).forEach(property => {
    const [key, value] = property;
    data = data.concat(`\n${convertToProperties(key)}=${value}`);
  });
  return data;
}
