import {StateSchema} from '../../../app/providers/StoreProvider';


export const getStorageSynchronizationLoading = (state: StateSchema) => state.storagesSynchronization.isLoading;
export const getStorageSynchronizationInformation = (state: StateSchema) => state.storagesSynchronization.synthInformation;
