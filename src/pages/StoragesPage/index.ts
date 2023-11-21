import {storagesPageReducer, storagesPageActions} from './model/slice/storagesPageSlice'
import {getStorages} from './model/services/getStorages/getStorages';
import {getFilteredStoragesList, getStoragesList, getStoragesPageLoading } from "./model/selectors/storagesPageSelectors";
import {StoragesPageSchema} from './model/types/storagesPageSchema';
import StoragesPage from "./ui/StoragesPage";

export {
  StoragesPage,
  getStoragesPageLoading,
  getFilteredStoragesList,
  getStoragesList,
  getStorages,
  storagesPageReducer,
  storagesPageActions,
  type StoragesPageSchema,
};
