import OnlineStorageApi from "./OnlineStorageApi";
import OfflineStorageApi from "./OfflineStorageApi";
import {IStorageApi, StorageMoveData, StorageUpdateData} from "../types/StorageApi";


class StorageApi {
  api: IStorageApi;
  readonly onlineApi = new OnlineStorageApi();
  readonly offlineApi = new OfflineStorageApi();

  constructor() {
    if (navigator.onLine) {
      this.api = this.onlineApi;
    } else {
      this.api = this.offlineApi;
    }
  }

  async getStorages() {
    const response = await this.api.getStorages();
    this.offlineApi.db.setStorages(response.data);
    return response;
  }

  async storageAdd(data: StorageUpdateData) {
    return await this.api.storageAdd(data);
  }

  async storageUse(data: StorageUpdateData) {
    return await this.api.storageUse(data);
  }

  async storageMove(data: StorageMoveData) {
    return await this.api.storageMove(data);
  }

  async storageInventory(data: StorageUpdateData) {
    return await this.api.storageInventory(data);
  }
}

export default StorageApi;