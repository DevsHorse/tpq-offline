import {OfflineHistoryAction} from '../../../entities/Storage';


export type SynchronizationInformation = {
  action: OfflineHistoryAction;
  success: boolean;
}