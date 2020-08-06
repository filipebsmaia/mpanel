import BCryptHashProvider from './BCryptHashProvider';
import DiskStorageProvider from './DiskStorageProvider';

export const hashProvider = new BCryptHashProvider();
export const storageProvider = new DiskStorageProvider();
