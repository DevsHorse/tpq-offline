import { createSlice } from '@reduxjs/toolkit';
import { StorageSchema } from '../types/StorageSchema';
import { storageAdd } from '../services/storageAdd/storageAdd';
import { storageUse } from '../services/storageUse/storageUse';
import { storageMove } from '../services/storageMove/storageMove';
import { storageInventory } from '../services/storageInventory/storageInventory';

const initialState: StorageSchema = {
  isLoading: false,
  error: undefined,
};

const storageSlice = createSlice({
  name: 'storageSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(storageAdd.pending, (state: StorageSchema) => {
        state.isLoading = true;
      })
      .addCase(storageAdd.fulfilled, (state: StorageSchema) => {
        state.isLoading = false;
      })
      .addCase(storageAdd.rejected, (state: StorageSchema, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(storageUse.pending, (state: StorageSchema) => {
        state.isLoading = true;
      })
      .addCase(storageUse.fulfilled, (state: StorageSchema) => {
        state.isLoading = false;
      })
      .addCase(storageUse.rejected, (state: StorageSchema, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(storageMove.pending, (state: StorageSchema) => {
        state.isLoading = true;
      })
      .addCase(storageMove.fulfilled, (state: StorageSchema) => {
        state.isLoading = false;
      })
      .addCase(storageMove.rejected, (state: StorageSchema, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(storageInventory.pending, (state: StorageSchema) => {
        state.isLoading = true;
      })
      .addCase(storageInventory.fulfilled, (state: StorageSchema) => {
        state.isLoading = false;
      })
      .addCase(storageInventory.rejected, (state: StorageSchema, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { reducer: storageReducer, actions: storageActions } =
  storageSlice;
