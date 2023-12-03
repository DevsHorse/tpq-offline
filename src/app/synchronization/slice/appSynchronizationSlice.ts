import { createSlice } from '@reduxjs/toolkit';
import { AppSynchronizationSchema } from '../types/AppSynchronizationSchema';
import { appSynchronization } from '../services/appSynchronization/appSynchronization';

const initialState: AppSynchronizationSchema = {
  isLoading: false,
};

const appSynchronizationSlice = createSlice({
  name: 'appSynchronizationSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        appSynchronization.pending,
        (state: AppSynchronizationSchema) => {
          state.isLoading = true;
        },
      )
      .addCase(
        appSynchronization.fulfilled,
        (state: AppSynchronizationSchema) => {
          state.isLoading = false;
        },
      )
      .addCase(
        appSynchronization.rejected,
        (state: AppSynchronizationSchema) => {
          state.isLoading = false;
        },
      );
  },
});

export const {
  reducer: appSynchronizationReducer,
  actions: appSynchronizationActions,
} = appSynchronizationSlice;
