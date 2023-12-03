import { createAsyncThunk } from '@reduxjs/toolkit';
import StorageApi from '../../api/StorageApi';
import { IStorage } from '../../types/Storage';
import { getThunkError } from '../../../../../shared/utils';

export const storageMove = createAsyncThunk<
  { source: IStorage; destination: IStorage },
  { sourceStorageId: string; destinationStorageId: string; count: number },
  { rejectValue: string }
>('storage/move', async (data, thunkApi) => {
  try {
    const response = await new StorageApi().storageMove(data);
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(getThunkError(e));
  }
});
