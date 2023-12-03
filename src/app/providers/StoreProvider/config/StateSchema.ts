import { StoragesPageSchema } from '../../../../pages/StoragesPage';
import { StorageSchema } from '../../../../entities/Storage';
import { StoragesSynchronizationSchema } from '../../../../features/StoragesSynchronization';
import { AppSynchronizationSchema } from '../../../synchronization';
import { NetworkSchema } from '../../../../features/Network';

export interface StateSchema {
  storagesPage: StoragesPageSchema;
  storage: StorageSchema;
  network: NetworkSchema;
  appSynchronization: AppSynchronizationSchema;
  storagesSynchronization: StoragesSynchronizationSchema;
}
