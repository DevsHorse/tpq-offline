import {IStorageApi, StorageMoveData, StorageUpdateData} from "../types/StorageApi";
import {AxiosInstance} from "axios";

class OnlineStorageApi implements IStorageApi {
  private static instance: OnlineStorageApi;
  private static api: AxiosInstance;
  private constructor() {};

  static getInstance() {
    if (!OnlineStorageApi.api) {
      throw new Error('OnlineStoreApi: config is not defined');
    }

    if (OnlineStorageApi.instance == null) {
      OnlineStorageApi.instance = new OnlineStorageApi();
    }

    return OnlineStorageApi.instance;
  }

  static register(api: AxiosInstance) {
    OnlineStorageApi.api = api;
    return OnlineStorageApi.getInstance();
  }

  async getStorages() {
    return await OnlineStorageApi.api.get('/storage');
  }

  async storageAdd(data: StorageUpdateData) {
    return await OnlineStorageApi.api.post('/storage/add', data);
  }

  async storageUse(data: StorageUpdateData) {
    return await OnlineStorageApi.api.post('/storage/use', data);
  }

  async storageMove(data: StorageMoveData) {
    return await OnlineStorageApi.api.post('/storage/move', data);
  }

  async storageInventory(data: StorageUpdateData) {
    return await OnlineStorageApi.api.post('/storage/inventory', data);
  }
}

export default OnlineStorageApi;