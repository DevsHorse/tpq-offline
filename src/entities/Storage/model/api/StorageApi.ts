import OnlineStorageApi from "./OnlineStorageApi";
import OfflineStorageApi from "./OfflineStorageApi";
import {IStorageApi, StorageMoveData, StorageUpdateData} from "../types/StorageApi";
import {isOnline} from "../../../../shared/network";


class StorageApi {
  api: IStorageApi;
  readonly onlineApi = OnlineStorageApi.getInstance();
  readonly offlineApi = OfflineStorageApi.getInstance();

  constructor() {
    if (isOnline()) {
      this.api = this.onlineApi;
    } else {
      this.api = this.offlineApi;
    }
  }

  async getStorages() {
    return await this.api.getStorages();
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