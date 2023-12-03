import api from '../../shared/api/api';
import { OnlineStorageApi } from '../../entities/Storage';
import { OfflineStorageApi } from '../../entities/Storage';

export const initApi = () => {
  OnlineStorageApi.register(api);
  OfflineStorageApi.getInstance();
};
