import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoragesSynchronizationSchema } from '../types/StoragesSynchronizationSchema';
import { SynchronizationInformation } from '../types/SynchronizationInformation';
import { storagesSynchronization } from '../services/storagesSynchronization/storagesSynchronization';

const initialState: StoragesSynchronizationSchema = {
  isLoading: false,
  synthInformation: [],
};

const storagesSynchronizationSlice = createSlice({
  name: 'storagesSynchronizationSlice',
  initialState,
  reducers: {
    clearSynchronizationInformation(state: StoragesSynchronizationSchema) {
      state.synthInformation = [];
    },
    setSynchronizationInformation(
      state: StoragesSynchronizationSchema,
      action: PayloadAction<SynchronizationInformation[]>,
    ) {
      state.synthInformation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        storagesSynchronization.pending,
        (state: StoragesSynchronizationSchema) => {
          state.isLoading = true;
        },
      )
      .addCase(
        storagesSynchronization.fulfilled,
        (state: StoragesSynchronizationSchema) => {
          state.isLoading = false;
        },
      )
      .addCase(
        storagesSynchronization.rejected,
        (state: StoragesSynchronizationSchema) => {
          state.isLoading = false;
        },
      );
  },
});

export const {
  reducer: storagesSynchronizationReducer,
  actions: storagesSynchronizationActions,
} = storagesSynchronizationSlice;
