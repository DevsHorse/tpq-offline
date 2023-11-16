import {StateSchema} from "./StateSchema";
import {configureStore, ReducersMapObject} from "@reduxjs/toolkit";
import {storagesPageReducer} from "../../../../pages/StoragesPage";


export const createReduxStore = (initialState?: StateSchema) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    storagesPage: storagesPageReducer,
  };

  return configureStore({
    reducer: rootReducers,
    preloadedState: initialState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
  })
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];