import { StateSchema } from './StateSchema';
import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { storagesPageReducer } from '../../../../pages/StoragesPage';
import { storageReducer } from '../../../../entities/Storage';
import { storagesSynchronizationReducer } from '../../../../features/StoragesSynchronization';
import { appSynchronizationReducer } from '../../../synchronization';
import { networkReducer } from '../../../../features/Network';

export const createReduxStore = (initialState?: StateSchema) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    storagesPage: storagesPageReducer,
    storage: storageReducer,
    storagesSynchronization: storagesSynchronizationReducer,
    network: networkReducer,
    appSynchronization: appSynchronizationReducer,
  };

  return configureStore({
    reducer: rootReducers,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
