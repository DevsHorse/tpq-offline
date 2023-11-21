import {createAsyncThunk} from "@reduxjs/toolkit";
import StorageApi from "../../../../entities/Storage/model/api/StorageApi";
import {SynthInformation} from "../../types/SynthInformation";
import {SavedAction, UpdateStorageType} from "../../../../entities/Storage";
import {storageSynchronizationActions} from "../../slice/storageSynchronizationSlice";
import {getStorages} from "../../../../pages/StoragesPage";
import {isOnline} from "../../../../shared/network";

const requestToApi = (action: SavedAction, api: StorageApi) => {
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
}

const wrappedRequest = (action: SavedAction, api: StorageApi) => {
  return (synthInformation: SynthInformation[]) => {
    return new Promise(async (res) => {
      let newSynthInformation: SynthInformation[] = [];

      if (Array.isArray(synthInformation)) {
        newSynthInformation = [...synthInformation];
      }

      try {
        const response = await requestToApi(action, api);
        api.offlineApi.removeAction(action.id);

        if (response) {
          newSynthInformation.push({
            action,
            success: true
          })
        }
      } catch (e: any) {
        if (e.code !== "ERR_NETWORK") {
          api.offlineApi.removeAction(action.id);
          newSynthInformation.push({
            action,
            success: false
          })
        }
      }

      res(newSynthInformation)
    })
  }
}


export const storageSynchronization = createAsyncThunk(
  'storageSynchronization/storageSynchronization',
  async (data, thunkApi) => {
    const {rejectWithValue, dispatch} = thunkApi;

    try {
      if (isOnline()) {
        const storageApi = new StorageApi();
        const actions: SavedAction[] = await storageApi.offlineApi.getActions();

        const actionsRequests = [];
        for (let action of actions) {
          actionsRequests.push(wrappedRequest(action, storageApi));
        }

        await actionsRequests.reduce((seq: Promise<any>, p) => seq.then(p), Promise.resolve()).then((result) => {
          if (result) {
            dispatch(storageSynchronizationActions.setSynthInformation(result));
          }
          dispatch(getStorages());
        });
      }
    } catch (e) {
      let error = 'Something went wrong...';
      if (e instanceof Error) {
        error = e.message;
      }
      return rejectWithValue(error);
    }
  })