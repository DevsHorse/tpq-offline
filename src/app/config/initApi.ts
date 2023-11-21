import OnlineStorageApi from "../../entities/Storage/model/api/OnlineStorageApi";
import api from "../../shared/api/api";
import OfflineStorageApi from "../../entities/Storage/model/api/OfflineStorageApi";

export const initApi = () => {
  OnlineStorageApi.register(api);
  OfflineStorageApi.getInstance();
}