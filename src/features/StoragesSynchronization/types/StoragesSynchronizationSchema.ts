import {SynchronizationInformation} from './SynchronizationInformation';

export interface StoragesSynchronizationSchema {
  isLoading: boolean;
  synthInformation: SynchronizationInformation[];
}