import {StateSchema} from "../../../../app/providers/StoreProvider";


export const getNetworkStatus = (state: StateSchema): boolean => state.network.isOnline;
export const getNetworkStatusAsString = (state: StateSchema): 'online' | 'offline' => state.network.isOnline ? 'online' : 'offline';