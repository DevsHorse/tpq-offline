import { createAsyncThunk } from '@reduxjs/toolkit';
import { IStorage, StorageApi } from '../../../../../entities/Storage';
import { getThunkError } from '../../../../../shared/utils';

export const getStorages = createAsyncThunk<IStorage[], void>(
  'storagesPage/getStorages',
  async (_, thunkApi) => {
    try {
      const response = await new StorageApi().getStorages();
      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue(getThunkError(e));
    }
  },
);
