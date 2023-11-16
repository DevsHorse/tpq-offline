import {createAsyncThunk} from "@reduxjs/toolkit";
import {MockedStorageApi} from "../../../index";
import {storagesPageActions} from "../../../../../pages/StoragesPage";


export const storageAdd = createAsyncThunk<void, {storageId: string, count: number}>(
  'storage/add',
  async (data, thunkApi) => {
    const {rejectWithValue, dispatch} = thunkApi;

    try {
      const response = await new MockedStorageApi().storageAdd(data);
      // const response = await new StorageApi().storageAdd();
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