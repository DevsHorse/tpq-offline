import {StateSchema} from "../../../app/providers/StoreProvider";


export const getStorageSynchronizationLoading = (state: StateSchema) => state.storageSynchronization.isLoading;
export const getStorageSynchronizationInformation = (state: StateSchema) => state.storageSynchronization.synthInformation;
