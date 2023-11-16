import {StoragesPageSchema} from "../../../../pages/StoragesPage";
import {StorageSchema} from "../../../../entities/Storage";
import {NetworkSchema} from "../../../../shared/network";


export interface StateSchema {
  storagesPage: StoragesPageSchema,
  storage: StorageSchema,
  network: NetworkSchema,
}