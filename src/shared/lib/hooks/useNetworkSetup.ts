import {useEffect} from "react";
import {useAppDispatch} from "./useAppDispatch";
import {isOnline} from "../../utils/isOnline";
import {useSynchronization} from "../../../app/synchronization";
import { networkActions } from "../../../features/Network";


export const useNetworkSetup = () => {
  const dispatch = useAppDispatch();

  const {startSynchronization} = useSynchronization();

  useEffect(() => {
    const onlineHandler = () => {
      dispatch(networkActions.changeStatus(true));
      startSynchronization();
    };

    const offlineHandler = () => {
      dispatch(networkActions.changeStatus(false));
    }

    window.addEventListener('online', onlineHandler);
    window.addEventListener('offline', offlineHandler);
    dispatch(networkActions.changeStatus(isOnline()));

    return () => {
      window.removeEventListener('online', onlineHandler);
      window.removeEventListener('offline', offlineHandler);
    }
  }, [dispatch, startSynchronization]);
}