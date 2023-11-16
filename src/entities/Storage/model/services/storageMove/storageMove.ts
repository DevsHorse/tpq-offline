import {createAsyncThunk} from "@reduxjs/toolkit";
import {MockedStorageApi} from "../../../index";
import {storagesPageActions} from "../../../../../pages/StoragesPage";


export const storageMove = createAsyncThunk<
  void,
  {sourceStorageId: string, destinationStorageId: string, count: number}
>(
  'storage/move',
  async (data, thunkApi) => {
    const {rejectWithValue, dispatch} = thunkApi;

    try {
      const response = await new MockedStorageApi().storageMove(data);
      // const response = await new StorageApi().storageMove();

      await dispatch(storagesPageActions.updateStorage(response.data[0].source));
      await dispatch(storagesPageActions.updateStorage(response.data[0].destination));
      return response.data;
    } catch (e) {
      let error = 'Something went wrong...';
      if (e instanceof Error) {
        error = e.message;
      }
      return rejectWithValue(error);
    }
  })