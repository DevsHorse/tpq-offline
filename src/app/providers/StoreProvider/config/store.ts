import {StateSchema} from "./StateSchema";
import {configureStore, ReducersMapObject} from "@reduxjs/toolkit";
import {storagesPageReducer} from "../../../../pages/StoragesPage";
import {storageReducer} from "../../../../entities/Storage";
import {storageSynchronizationReducer} from "../../../../features/StorageSynchronization";
import {synchronizationReducer} from "../../../synchronization";
import {networkReducer} from "../../../../features/Network";


export const createReduxStore = (initialState?: StateSchema) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    storagesPage: storagesPageReducer,
    storage: storageReducer,
    network: networkReducer,
    synchronization: synchronizationReducer,
    storageSynchronization: storageSynchronizationReducer
  };

  return configureStore({
    reducer: rootReducers,
    preloadedState: initialState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
  })
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];