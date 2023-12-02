import {StateSchema} from '../../../../app/providers/StoreProvider';
import {IStorage} from '../../../../entities/Storage';

export const getStoragesList = (state: StateSchema) =>
	state.storagesPage.storages || [];

export const getFilteredStoragesList = (predicate: (value: IStorage, index: number, array: IStorage[]) => unknown) =>
	(state: StateSchema) => state.storagesPage.storages.filter(predicate);

export const getStoragesPageLoading = (state: StateSchema) =>
	state.storagesPage.isLoading;