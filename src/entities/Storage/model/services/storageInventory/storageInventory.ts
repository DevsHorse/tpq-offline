import {createAsyncThunk} from "@reduxjs/toolkit";
import {MockedStorageApi} from "../../../index";
import {storagesPageActions} from "../../../../../pages/StoragesPage";

export const storageInventory = createAsyncThunk<void, {storageId: string, count: number}>(
  'storage/inventory',
  async (data, thunkApi) => {
    const {rejectWithValue, dispatch} = thunkApi;

    try {
      const response = await new MockedStorageApi().storageInventory(data);
      // const response = await new StorageApi().storageInventory();
      await dispatch(storagesPageActions.updateStorage(response.data[0]));
      return response.data;
    } catch (e) {
      let error = 'Something went wrong...';
      if (e instanceof Error) {
        error = e.message;
      }
      return rejectWithValue(error);
    }
  })