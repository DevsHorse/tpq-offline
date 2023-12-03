import {
  IStorageApi,
  ResponsePromise,
  StorageMoveData,
  StorageUpdateData,
} from '../types/StorageApi';
import StorageDB from '../db/StorageDB';
import { UpdateStorageType } from '../types/UpdateStorageType';
import { IStorage } from '../types/Storage';

class OfflineStorageApi implements IStorageApi {
  private readonly db = new StorageDB();
  private static instance: OfflineStorageApi;

  private constructor() {}

  static getInstance() {
    if (OfflineStorageApi.instance == null) {
      OfflineStorageApi.instance = new OfflineStorageApi();
    }

    return OfflineStorageApi.instance;
  }

  getStorages(): ResponsePromise {
    return new Promise((resolve) => {
      const storages = this.db.getStorages();
      resolve({ data: storages });
    });
  }

  storageAdd(data: StorageUpdateData): ResponsePromise {
    return new Promise(async (resolve, reject) => {
      this.db
        .updateStorage({
          data,
          type: UpdateStorageType.ADD,
        })
        .then((storage) => resolve({ data: storage }))
        .catch(reject);
    });
  }

  storageUse(data: StorageUpdateData): ResponsePromise {
    return new Promise((resolve, reject) => {
      this.db
        .updateStorage({
          data,
          type: UpdateStorageType.USE,
        })
        .then((storage) => resolve({ data: storage }))
        .catch(reject);
    });
  }

  storageMove(data: StorageMoveData): ResponsePromise {
    return new Promise((resolve, reject) => {
      this.db
        .updateStorage({
          data,
          type: UpdateStorageType.MOVE,
        })
        .then((storages) => resolve({ data: storages }))
        .catch(reject);
    });
  }

  storageInventory(data: StorageUpdateData): ResponsePromise {
    return new Promise((resolve, reject) => {
      this.db
        .updateStorage({
          data,
          type: UpdateStorageType.INVENTORY,
        })
        .then((storage) => resolve({ data: storage }))
        .catch(reject);
    });
  }

  setStorages(storages: IStorage[]) {
    return this.db.setStorages(storages);
  }

  getActions() {
    return this.db.getActions();
  }

  removeAction(id: number) {
    return this.db.removeAction(id);
  }
}

export default OfflineStorageApi;
