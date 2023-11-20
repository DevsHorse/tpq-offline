import {createAsyncThunk} from "@reduxjs/toolkit";
import {storagesPageActions} from "../../../../../pages/StoragesPage";
import StorageApi from "../../api/StorageApi";


export const storageMove = createAsyncThunk<
  void,
  {sourceStorageId: string, destinationStorageId: string, count: number}
>(
  'storage/move',
  async (data, thunkApi) => {
    const {rejectWithValue, dispatch} = thunkApi;

    try {
      const response = await new StorageApi().storageMove(data);

      await dispatch(storagesPageActions.updateStorage(response.data.source));
      await dispatch(storagesPageActions.updateStorage(response.data.destination));
      return response.data;
    } catch (e) {
      let error = 'Something went wrong...';
      if (e instanceof Error) {
        error = e.message;
      }
      return rejectWithValue(error);
    }
  })