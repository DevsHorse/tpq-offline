import {createAsyncThunk} from "@reduxjs/toolkit";
import {MockedStorageApi} from "../../../index";
import {storagesPageActions} from "../../../../../pages/StoragesPage";


export const storageUse = createAsyncThunk<void, {storageId: string, count: number}>(
  'storage/use',
  async (data, thunkApi) => {
    const {rejectWithValue, dispatch} = thunkApi;

    try {
      const response = await new MockedStorageApi().storageUse(data);
      // const response = await new StorageApi().storageUse();

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