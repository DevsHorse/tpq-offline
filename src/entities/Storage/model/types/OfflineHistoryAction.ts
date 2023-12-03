import { UpdateStorageOptions } from './UpdateStorageOptions';
import { IStorage } from './Storage';

export type OfflineHistoryAction = {
  id: number;
  storages: {
    [id: string]: IStorage;
  };
} & UpdateStorageOptions;
