import {storagesPageReducer, storagesPageActions} from './model/slice/storagesPageSlice'
import {getStorages} from './model/services/getStorages/getStorages';
import {getFilteredStoragesList, getStoragesList, getStoragesPageLoading } from "./model/selectors/storagesPageSelectors";
import StoragesPage from "./ui/StoragesPage";

export type { StoragesPageSchema } from './model/types/storagesPageSchema';

export {
  StoragesPage,
  getStoragesPageLoading,
  getFilteredStoragesList,
  getStoragesList,
  getStorages,
  storagesPageReducer,
  storagesPageActions
};
