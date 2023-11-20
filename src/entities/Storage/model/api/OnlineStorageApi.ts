import {IStorageApi, StorageMoveData, StorageUpdateData} from "../types/StorageApi";
import {$api} from "../../../../shared/api/api";

class OnlineStorageApi implements IStorageApi {
  private $api = $api;

  async getStorages() {
    return await this.$api.get('/storage');
  }

  async storageAdd(data: StorageUpdateData) {
    return await this.$api.post('/storage/add', data);
  }

  async storageUse(data: StorageUpdateData) {
    return await this.$api.post('/storage/use', data);
  }

  async storageMove(data: StorageMoveData) {
    return await this.$api.post('/storage/move', data);
  }

  async storageInventory(data: StorageUpdateData) {
    return await this.$api.post('/storage/inventory', data);
  }
}

export default OnlineStorageApi;