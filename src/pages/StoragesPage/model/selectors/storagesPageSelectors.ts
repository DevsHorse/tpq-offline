import {StateSchema} from "../../../../app/providers/StoreProvider";

export const getStoragesList = (state: StateSchema) =>
  state.storagesPage.storages || [];

export const getStoragesPageLoading = (state: StateSchema) =>
  state.storagesPage.isLoading;