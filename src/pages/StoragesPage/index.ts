import {getFilteredStoragesList, getStoragesList, getStoragesPageLoading } from "./model/selectors/storagesPageSelectors";
import StoragesPage from "./ui/StoragesPage";
import {getStorages} from './model/services/getStorages/getStorages';

export {
  StoragesPage,
  getStoragesList,
  getStoragesPageLoading,
  getFilteredStoragesList,
  getStorages
};

export type { StoragesPageSchema } from './model/types/storagesPageSchema';
export {storagesPageReducer, storagesPageActions} from './model/slice/storagesPageSlice'
export {}