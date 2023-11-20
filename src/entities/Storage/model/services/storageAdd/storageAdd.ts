import {createAsyncThunk} from "@reduxjs/toolkit";
import {storagesPageActions} from "../../../../../pages/StoragesPage";
import StorageApi from "../../api/StorageApi";


export const storageAdd = createAsyncThunk<void, {storageId: string, count: number}>(
  'storage/add',
  async (data, thunkApi) => {
    const {rejectWithValue, dispatch} = thunkApi;

    try {
      const response = await new StorageApi().storageAdd(data);
      await dispatch(storagesPageActions.updateStorage(response.data));
      return response.data;
    } catch (e) {
      let error = 'Something went wrong...';
      if (e instanceof Error) {
        error = e.message;
      }
      return rejectWithValue(error);
    }
  })