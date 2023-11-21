import {IStorageApi, ResponsePromise, StorageMoveData, StorageUpdateData} from "../types/StorageApi";
import StorageDB from "../db/StorageDB";
import {UpdateStorageType} from "../types/UpdateStorageType";
import {IStorage} from "../types/Storage";


class OfflineStorageApi implements IStorageApi {
  private readonly db = new StorageDB();
  private static instance: OfflineStorageApi;
  private constructor() {};

  static getInstance() {
    if (OfflineStorageApi.instance == null) {
      OfflineStorageApi.instance = new OfflineStorageApi();
    }

    return OfflineStorageApi.instance;
  }

  getStorages(): ResponsePromise {
    return new Promise((res) => {
      const storages = this.db.getStorages();
      res({data: storages});
    })
  }

  storageAdd(data: StorageUpdateData): ResponsePromise {
    return new Promise(async (res, rej) => {
      this.db.updateStorage({
        data,
        type: UpdateStorageType.ADD
      }).then(storage => res({data: storage}))
        .catch(rej);
    })
  }

  storageUse(data: StorageUpdateData): ResponsePromise {
    return new Promise((res, rej) => {
      this.db.updateStorage({
        data,
        type: UpdateStorageType.USE
      }).then(storage => res({data: storage}))
        .catch(rej);
    })
  }

  storageMove(data: StorageMoveData): ResponsePromise {
    return new Promise((res, rej) => {
      this.db.updateStorage({
        data,
        type: UpdateStorageType.MOVE
      }).then(storages => res({data: storages}))
        .catch(rej);
    })
  }

  storageInventory(data: StorageUpdateData): ResponsePromise {
    return new Promise((res, rej) => {
      this.db.updateStorage({
        data,
        type: UpdateStorageType.INVENTORY
      }).then(storage => res({data: storage}))
        .catch(rej);
    })
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