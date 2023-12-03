import { StateSchema } from '../../providers/StoreProvider';

export const getAppSynchronizationLoading = (state: StateSchema) =>
  state.appSynchronization.isLoading;
