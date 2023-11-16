import StorageApi from "./model/api/StorageApi";
import MockedStorageApi from "./model/api/MockedStorageApi";
import {storageInventory} from './model/services/storageInventory/storageInventory';
import {storageAdd} from './model/services/storageAdd/storageAdd';
import {storageUse} from './model/services/storageUse/storageUse';
import {storageMove} from './model/services/storageMove/storageMove';
import {storageActions, storageReducer } from "./model/slice/storageSlice";

export type {IStorage} from './model/types/Storage';
export type {StorageSchema} from './model/types/StorageSchema';

export {
  StorageApi,
  MockedStorageApi,
  storageReducer,
  storageActions,
  storageInventory,
  storageAdd,
  storageUse,
  storageMove
};