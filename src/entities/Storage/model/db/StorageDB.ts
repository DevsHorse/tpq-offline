import { IStorage } from '../types/Storage';
import { UpdateStorageType } from '../types/UpdateStorageType';
import { OfflineHistoryAction } from '../types/OfflineHistoryAction';
import { UpdateStorageOptions } from '../types/UpdateStorageOptions';
import { StorageDBKeys } from '../types/StorageDBKeys';

class StorageDB {
  private readonly lsStoragesKey: StorageDBKeys = StorageDBKeys.STORAGES;
  private readonly lsStoragesActionsKey: StorageDBKeys = StorageDBKeys.ACTIONS;

  constructor() {
    this.init();
  }

  init() {
    const storages = localStorage.getItem(this.lsStoragesKey);
    const actions = localStorage.getItem(this.lsStoragesActionsKey);

    if (!storages) {
      localStorage.setItem(this.lsStoragesKey, JSON.stringify([]));
    }

    if (!actions) {
      localStorage.setItem(this.lsStoragesActionsKey, JSON.stringify([]));
    }
  }

  setStorages(storages: IStorage[]) {
    if (!storages) return;
    localStorage.setItem(this.lsStoragesKey, JSON.stringify(storages));
  }

  getStorages(): IStorage[] {
    const items = localStorage.getItem(this.lsStoragesKey);

    if (items) {
      return JSON.parse(items);
    }
    return [];
  }

  updateStorage(options: UpdateStorageOptions) {
    return new Promise((resolve, reject) => {
      const { data, type } = options;
      const storages = this.getStorages();

      this.addAction(options);

      switch (type) {
        case UpdateStorageType.ADD: {
          const storageIndex = storages.findIndex(
            (storage) => storage.id === data.storageId,
          );

          if (storageIndex === -1) {
            reject('incorrect storage');
          }

          resolve(
            this.updateDBStorage(storageIndex, (storage) => {
              storage.productsCount += data.count;
            }),
          );
          break;
        }
        case UpdateStorageType.USE: {
          const storageIndex = storages.findIndex(
            (storage) => storage.id === data.storageId,
          );

          if (storageIndex === -1) {
            reject('incorrect storage');
          }

          resolve(
            this.updateDBStorage(storageIndex, (storage) => {
              storage.productsCount -= data.count;
            }),
          );
          break;
        }
        case UpdateStorageType.MOVE: {
          const storageIndex1 = storages.findIndex(
            (storage) => storage.id === data.sourceStorageId,
          );
          const storageIndex2 = storages.findIndex(
            (storage) => storage.id === data.destinationStorageId,
          );

          if (storageIndex1 === -1 || storageIndex2 === -1) {
            reject('incorrect storage');
          }

          resolve({
            source: this.updateDBStorage(storageIndex1, (storage) => {
              storage.productsCount -= data.count;
            }),
            destination: this.updateDBStorage(storageIndex2, (storage) => {
              storage.productsCount += data.count;
            }),
          });
          break;
        }
        case UpdateStorageType.INVENTORY: {
          const storageIndex = storages.findIndex(
            (storage) => storage.id === data.storageId,
          );

          if (storageIndex === -1) {
            reject('incorrect storage');
          }

          resolve(
            this.updateDBStorage(storageIndex, (storage) => {
              storage.productsCount = data.count;
            }),
          );
          break;
        }

        default:
          reject('incorrect type');
      }
    });
  }

  getActions() {
    const items = localStorage.getItem(this.lsStoragesActionsKey);

    if (items) {
      return JSON.parse(items);
    }

    return [];
  }

  addAction(options: UpdateStorageOptions) {
    const storages = this.getStorages();
    const storagesById: { [key: string]: IStorage } = {};

    for (const storage of storages) {
      storagesById[storage.id] = storage;
    }

    const items = localStorage.getItem(this.lsStoragesActionsKey);
    let actions: OfflineHistoryAction[] = [];

    if (items) {
      actions = JSON.parse(items);
    }

    const storagesInAction: { [key: string]: IStorage } = {};

    switch (options.type) {
      case UpdateStorageType.ADD:
      case UpdateStorageType.INVENTORY:
      case UpdateStorageType.USE: {
        storagesInAction[options.data.storageId] =
          storagesById[options.data.storageId];
        break;
      }
      case UpdateStorageType.MOVE: {
        storagesInAction[options.data.sourceStorageId] =
          storagesById[options.data.sourceStorageId];
        storagesInAction[options.data.destinationStorageId] =
          storagesById[options.data.destinationStorageId];
        break;
      }
    }

    actions.push({
      id: new Date().getTime(),
      storages: storagesInAction,
      ...options,
    });

    localStorage.setItem(this.lsStoragesActionsKey, JSON.stringify(actions));
  }

  removeAction(id: number) {
    const items = localStorage.getItem(this.lsStoragesActionsKey);

    if (items) {
      let actions = JSON.parse(items);
      actions = actions.filter(
        (action: OfflineHistoryAction) => action.id !== id,
      );
      localStorage.setItem(this.lsStoragesActionsKey, JSON.stringify(actions));
    }
  }

  private updateDBStorage(
    storageIndex: number,
    mutate: (storage: IStorage) => void,
  ) {
    const newStorages = [...this.getStorages()];
    const newStorage = { ...newStorages[storageIndex] };

    mutate(newStorage);
    newStorages.splice(storageIndex, 1, newStorage);

    this.setStorages(newStorages);
    return { ...newStorage };
  }
}

export default StorageDB;
