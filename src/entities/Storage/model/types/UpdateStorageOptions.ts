import {StorageMoveData, StorageUpdateData} from "./StorageApi";
import {UpdateStorageType} from "./UpdateStorageType";


export type UpdateStorageOptions = {
  data: StorageUpdateData,
  type: UpdateStorageType.ADD
} | {
  data: StorageUpdateData,
  type: UpdateStorageType.USE
} | {
  data: StorageUpdateData,
  type: UpdateStorageType.INVENTORY
} | {
  data: StorageMoveData,
  type: UpdateStorageType.MOVE
}