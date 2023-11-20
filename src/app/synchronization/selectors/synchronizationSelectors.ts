import {StateSchema} from "../../providers/StoreProvider";


export const getSynchronizationLoading = (state: StateSchema) => state.synchronization.isLoading;