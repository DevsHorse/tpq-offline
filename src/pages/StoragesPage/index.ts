import {storagesPageReducer, storagesPageActions} from './model/slice/storagesPageSlice';
import {getStorages} from './model/services/getStorages/getStorages';
import {storagesPageSynchronization} from './model/services/storagesPageSynchronization/storagesPageSynchronization';
import {getFilteredStoragesList, getStoragesList, getStoragesPageLoading } from './model/selectors/storagesPageSelectors';
import {StoragesPageSchema} from './model/types/storagesPageSchema';
import StoragesPage from './ui/StoragesPage';

export {
	StoragesPage,
	getStoragesPageLoading,
	getFilteredStoragesList,
	getStoragesList,
	getStorages,
	storagesPageSynchronization,
	storagesPageReducer,
	storagesPageActions,
	type StoragesPageSchema,
};
