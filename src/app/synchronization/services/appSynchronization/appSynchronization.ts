import { createAsyncThunk } from '@reduxjs/toolkit';
import { getThunkError, isOnline } from '../../../../shared/utils';
import { storagesPageSynchronization } from '../../../../pages/StoragesPage';

export const appSynchronization = createAsyncThunk(
  'storagesPageSynchronization/storagesPageSynchronization',
  async (data, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    try {
      if (isOnline()) {
        await dispatch(storagesPageSynchronization());
      }
    } catch (e) {
      return rejectWithValue(getThunkError(e));
    }
  },
);
