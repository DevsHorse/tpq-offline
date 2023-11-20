import {createAsyncThunk} from "@reduxjs/toolkit";
import {storageSynchronization} from "../../../../features/StorageSynchronization";
import {isOnline} from "../../../../shared/network";


export const synchronization = createAsyncThunk(
  'storageSynchronization/storageSynchronization',
  async (data, thunkApi) => {
    const {rejectWithValue, dispatch} = thunkApi;

    try {
      if (isOnline()) {
        await dispatch(storageSynchronization());
      }
    } catch (e) {
      let error = 'Something went wrong...';
      if (e instanceof Error) {
        error = e.message;
      }
      return rejectWithValue(error);
    }
  })