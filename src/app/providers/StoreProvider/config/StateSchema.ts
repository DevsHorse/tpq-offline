import {StoragesPageSchema} from "../../../../pages/StoragesPage";
import {StorageSchema} from "../../../../entities/Storage";
import {NetworkSchema} from "../../../../shared/network";
import {StorageSynchronizationSchema} from "../../../../features/StorageSynchronization";
import {SynchronizationSchema} from "../../../synchronization";


export interface StateSchema {
  storagesPage: StoragesPageSchema,
  storage: StorageSchema,
  network: NetworkSchema,
  synchronization: SynchronizationSchema
  storageSynchronization: StorageSynchronizationSchema,
}