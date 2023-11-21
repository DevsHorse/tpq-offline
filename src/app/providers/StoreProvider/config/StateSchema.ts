import {StoragesPageSchema} from "../../../../pages/StoragesPage";
import {StorageSchema} from "../../../../entities/Storage";
import {StorageSynchronizationSchema} from "../../../../features/StorageSynchronization";
import {SynchronizationSchema} from "../../../synchronization";
import {NetworkSchema} from "../../../../features/Network";


export interface StateSchema {
  storagesPage: StoragesPageSchema,
  storage: StorageSchema,
  network: NetworkSchema,
  synchronization: SynchronizationSchema
  storageSynchronization: StorageSynchronizationSchema,
}