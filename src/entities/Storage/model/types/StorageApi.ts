import {AxiosResponse} from 'axios';

export type StorageUpdateData = {
  storageId: string;
  count: number;
}

export type StorageMoveData = {
  sourceStorageId: string,
  destinationStorageId: string,
  count: number
}

export type ResponsePromise = Promise<AxiosResponse | {data: any}>

export interface IStorageApi {
  getStorages(): ResponsePromise;
  storageAdd(data: StorageUpdateData): ResponsePromise;
  storageUse(data: StorageUpdateData): ResponsePromise;
  storageMove(data: StorageMoveData): ResponsePromise;
  storageInventory(data: StorageUpdateData): ResponsePromise;
}