import {createAsyncThunk} from "@reduxjs/toolkit";
import {IStorage, StorageApi} from "../../../../../entities/Storage";


export const getStorages = createAsyncThunk<IStorage[], void>(
  'storagesPage/getStorages',
  async (props, thunkApi) => {
    const {rejectWithValue} = thunkApi;

    try {
      const response = await new StorageApi().getStorages();
      return response.data;
    } catch (e) {
      let error = 'Something went wrong...';
      if (e instanceof Error) {
        error = e.message;
      }
      return rejectWithValue(error);
    }
})