import {StateSchema} from "./StateSchema";
import {configureStore, ReducersMapObject} from "@reduxjs/toolkit";
import {storagesPageReducer} from "../../../../pages/StoragesPage";
import {storageReducer} from "../../../../entities/Storage";
import {networkReducer} from "../../../../shared/network";


export const createReduxStore = (initialState?: StateSchema) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    storagesPage: storagesPageReducer,
    storage: storageReducer,
    network: networkReducer
  };

  return configureStore({
    reducer: rootReducers,
    preloadedState: initialState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
  })
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];