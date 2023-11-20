import {createAsyncThunk} from "@reduxjs/toolkit";
import {storageSynchronization} from "../../../../features/StorageSynchronization";


export const synchronization = createAsyncThunk(
  'storageSynchronization/storageSynchronization',
  async (data, thunkApi) => {
    const {rejectWithValue, dispatch} = thunkApi;

    try {
      if (navigator.onLine) {
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