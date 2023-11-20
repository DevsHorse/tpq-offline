import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {StorageSynchronizationSchema} from "../types/StorageSynchronizationSchema";
import {SynthInformation} from "../types/SynthInformation";
import {storageSynchronization} from "../services/storageSynchronization/storageSynchronization";

const initialState: StorageSynchronizationSchema = {
  isLoading: false,
  synthInformation: [],
}

const storageSynchronizationSlice = createSlice({
  name: 'storageSynchronizationSlice',
  initialState,
  reducers: {
    clearSynthInformation(state: StorageSynchronizationSchema) {
      state.synthInformation = [];
    },
    setSynthInformation(state: StorageSynchronizationSchema, action: PayloadAction<SynthInformation[]>) {
      state.synthInformation = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(storageSynchronization.pending, (state: StorageSynchronizationSchema) => {
      state.isLoading = true;
    }).addCase(storageSynchronization.fulfilled, (state: StorageSynchronizationSchema) => {
      state.isLoading = false;
    }).addCase(storageSynchronization.rejected, (state: StorageSynchronizationSchema) => {
      state.isLoading = false;
    })
  }
})

export const { reducer: storageSynchronizationReducer, actions: storageSynchronizationActions } =
  storageSynchronizationSlice;

