import {IStorage} from "../types/Storage";
import {UpdateStorageType} from "../types/UpdateStorageType";
import {SavedAction} from "../types/SavedAction";
import {UpdateStorageOptions} from "../types/UpdateStorageOptions";
import {StorageDBKeys} from "../types/StorageDBKeys";


class StorageDB {
  private readonly lsStoragesKey: StorageDBKeys = StorageDBKeys.STORAGES;
  private readonly lsStoragesActionsKey: StorageDBKeys = StorageDBKeys.ACTIONS;

  constructor() {
    this.init();
  }

  init() {
    const storages = localStorage.getItem(this.lsStoragesKey);
    const actions = localStorage.getItem(this.lsStoragesActionsKey);
    if (!storages) localStorage.setItem(this.lsStoragesKey, JSON.stringify([]));
    if (!actions) localStorage.setItem(this.lsStoragesActionsKey, JSON.stringify([]));
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

  private mutateStorage(storageIndex: number, cb: (storage: IStorage) => IStorage) {
    const newStorages = [...this.getStorages()];
    let newStorage = {...newStorages[storageIndex]};
    newStorage = cb({...newStorage});
    newStorages.splice(storageIndex, 1, newStorage);
    this.setStorages(newStorages);
    return {...newStorage};
  }

  updateStorage(options: UpdateStorageOptions) {
    return new Promise((res, rej) => {
      const {data, type} = options;
      const storages = this.getStorages();
      this.addAction(options);

      switch (type) {
        case UpdateStorageType.ADD: {
          const storageIndex = storages.findIndex(s => s.id === data.storageId);
          if (storageIndex !== -1) {
            let newStorage = this.mutateStorage(storageIndex, (s) => {
              s.productsCount += data.count;
              return s;
            });
            res(newStorage);
          } else {
            rej('incorrect storage');
          }
          break;
        }
        case UpdateStorageType.USE: {
          const storageIndex = storages.findIndex(s => s.id === data.storageId);
          if (storageIndex !== -1) {
            let newStorage = this.mutateStorage(storageIndex, (s) => {
              s.productsCount -= data.count;
              return s;
            });
            res(newStorage);
          } else {
            rej('incorrect storage');
          }
          break;
        }
        case UpdateStorageType.MOVE: {
          const storageIndex1 = storages.findIndex(s => s.id === data.sourceStorageId);
          const storageIndex2 = storages.findIndex(s => s.id === data.destinationStorageId);
          if (storageIndex1 !== -1 && storageIndex2 !== -1) {
            const newStorage1 = this.mutateStorage(storageIndex1, (s) => {
              s.productsCount -= data.count;
              return s;
            })
            const newStorage2 = this.mutateStorage(storageIndex2, (s) => {
              s.productsCount += data.count;
              return s;
            })
            res({source: newStorage1, destination: newStorage2});
          } else {
            rej('incorrect storage');
          }
          break;
        }
        case UpdateStorageType.INVENTORY: {
          const storageIndex = storages.findIndex(s => s.id === data.storageId);
          if (storageIndex !== -1) {
            let newStorage = this.mutateStorage(storageIndex, (s) => {
              s.productsCount = data.count;
              return s;
            });
            res(newStorage);
          } else {
            rej('incorrect storage');
          }
          break;
        }

        default:
          rej('incorrect type');
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
    const storagesById: {[key: string]: IStorage} = {};

    for (let storage of storages) {
      storagesById[storage.id] = storage;
    }

    const items = localStorage.getItem(this.lsStoragesActionsKey);

    let actions: SavedAction[] = [];
    if (items) {
      actions = JSON.parse(items);
    }

    const storagesInAction: {[key: string]: IStorage} = {};
    switch (options.type) {
      case UpdateStorageType.ADD:
      case UpdateStorageType.INVENTORY:
      case UpdateStorageType.USE: {
        storagesInAction[options.data.storageId] = storagesById[options.data.storageId];
        break;
      }
      case UpdateStorageType.MOVE: {
        storagesInAction[options.data.sourceStorageId] = storagesById[options.data.sourceStorageId];
        storagesInAction[options.data.destinationStorageId] = storagesById[options.data.destinationStorageId];
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
    let items = localStorage.getItem(this.lsStoragesActionsKey);
    if (items) {
      let actions = JSON.parse(items);
      actions = actions.filter((action: SavedAction) => action.id !== id);
      localStorage.setItem(this.lsStoragesActionsKey, JSON.stringify(actions));
    }
  }
}

export default StorageDB;