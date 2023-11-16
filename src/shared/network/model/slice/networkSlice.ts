import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {NetworkSchema} from "../types/networkSchema";

const initialState: NetworkSchema = {
  isOnline: true,
};

const networkSlice = createSlice({
  name: 'networkSlice',
  initialState: initialState,
  reducers: {
    changeStatus(state: NetworkSchema, action: PayloadAction<boolean>) {
      state.isOnline = action.payload;
    }
  },
});

export const { reducer: networkReducer, actions: networkActions } =
  networkSlice;
