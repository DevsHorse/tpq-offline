import { createAsyncThunk } from '@reduxjs/toolkit';
import { SynchronizationInformation } from '../../types/SynchronizationInformation';
import {
  OfflineHistoryAction,
  UpdateStorageType,
  StorageApi,
} from '../../../../entities/Storage';
import { storagesSynchronizationActions } from '../../slice/storagesSynchronizationSlice';
import { getThunkError, isOnline } from '../../../../shared/utils';

const requestToApi = (action: OfflineHistoryAction, api: StorageApi) => {
  switch (action.type) {
    case UpdateStorageType.ADD: {
      return api.onlineApi.storageAdd(action.data);
    }
    case UpdateStorageType.USE: {
      return api.onlineApi.storageUse(action.data);
    }
    case UpdateStorageType.MOVE: {
      return api.onlineApi.storageMove(action.data);
    }
    case UpdateStorageType.INVENTORY: {
      return api.onlineApi.storageInventory(action.data);
    }
  }
};

const wrappedRequest = (action: OfflineHistoryAction, api: StorageApi) => {
  return (synchronizationInformation: SynchronizationInformation[]) => {
    return new Promise(async (resolve) => {
      let newSynchronizationInformation: SynchronizationInformation[] = [];

      if (Array.isArray(synchronizationInformation)) {
        newSynchronizationInformation = [...synchronizationInformation];
      }

      try {
        const response = await requestToApi(action, api);
        api.offlineApi.removeAction(action.id);

        if (response) {
          newSynchronizationInformation.push({
            action,
            success: true,
          });
        }
      } catch (e: any) {
        if (e.code !== 'ERR_NETWORK') {
          api.offlineApi.removeAction(action.id);
          newSynchronizationInformation.push({
            action,
            success: false,
          });
        }
      }

      resolve(newSynchronizationInformation);
    });
  };
};

export const storagesSynchronization = createAsyncThunk(
  'storagesSynchronization/storagesSynchronization',
  async (data, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    try {
      if (isOnline()) {
        const storageApi = new StorageApi();
        const actions: OfflineHistoryAction[] =
          await storageApi.offlineApi.getActions();

        const actionsRequests = [];
        for (const action of actions) {
          actionsRequests.push(wrappedRequest(action, storageApi));
        }

        await actionsRequests
          .reduce(
            (sequence: Promise<any>, promise) => sequence.then(promise),
            Promise.resolve(),
          )
          .then((result: SynchronizationInformation[] | void) => {
            if (result) {
              dispatch(
                storagesSynchronizationActions.setSynchronizationInformation(
                  result,
                ),
              );
            }
          });
      }
    } catch (e) {
      return rejectWithValue(getThunkError(e));
    }
  },
);
