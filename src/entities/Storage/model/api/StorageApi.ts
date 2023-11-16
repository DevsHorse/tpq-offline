import {$api} from "../../../../shared/api/api";


class StorageApi {
  $api = $api;

  async getStorages() {
    return await this.$api.get('/storage');
  }

  async storageAdd(data: {
    storageId: string;
    count: number;
  }) {
    return await this.$api.post('/storage/add', data);
  }

  async storageUse(data: {
    storageId: string;
    count: number;
  }) {
    return await this.$api.post('/storage/use', data);
  }

  async storageMove(data: {
    sourceStorageId: string,
    destinationStorageId: string,
    count: number
  }) {
    return await this.$api.post('/storage/move', data);
  }

  async storageInventory(data: {
    storageId: string;
    count: number;
  }) {
    return await this.$api.post('/storage/inventory', data);
  }
}

export default StorageApi;