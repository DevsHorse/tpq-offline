import {createSlice} from "@reduxjs/toolkit";
import {SynchronizationSchema} from "../types/SynchronizationSchema";
import {synchronization} from "../services/synchronization/synchronization";

const initialState: SynchronizationSchema = {
  isLoading: false
}

const synchronizationSlice = createSlice({
  name: 'synchronizationSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(synchronization.pending, (state: SynchronizationSchema) => {
      state.isLoading = true;
    }).addCase(synchronization.fulfilled, (state: SynchronizationSchema) => {
      state.isLoading = false;
    }).addCase(synchronization.rejected, (state: SynchronizationSchema) => {
      state.isLoading = false;
    })
  }
})

export const { reducer: synchronizationReducer, actions: synchronizationActions } =
  synchronizationSlice;