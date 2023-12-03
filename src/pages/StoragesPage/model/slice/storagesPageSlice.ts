import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoragesPageSchema } from '../types/storagesPageSchema';
import { getStorages } from '../services/getStorages/getStorages';
import { IStorage } from '../../../../entities/Storage';

const initialState: StoragesPageSchema = {
  error: undefined,
  isLoading: true,
  storages: [],
};

const storagesPageSlice = createSlice({
  name: 'storagesPageSlice',
  initialState: initialState,
  reducers: {
    updateStorage(state: StoragesPageSchema, action: PayloadAction<IStorage>) {
      const index = state.storages.findIndex(
        (storage) => storage.id === action.payload.id,
      );

      if (index !== -1) {
        const newStorages = [...state.storages];
        newStorages.splice(index, 1, action.payload);
        state.storages = newStorages;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStorages.pending, (state: StoragesPageSchema) => {
        state.isLoading = true;
      })
      .addCase(
        getStorages.fulfilled,
        (state: StoragesPageSchema, action: PayloadAction<IStorage[]>) => {
          state.storages = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(getStorages.rejected, (state: StoragesPageSchema, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  },
});

export const { reducer: storagesPageReducer, actions: storagesPageActions } =
  storagesPageSlice;
