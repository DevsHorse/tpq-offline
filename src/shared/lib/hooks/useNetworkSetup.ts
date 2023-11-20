import {useEffect} from "react";
import {useAppDispatch} from "./useAppDispatch";
import {networkActions} from "../../network";
import {useSynchronization} from "../../../app/synchronization";


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
    dispatch(networkActions.changeStatus(navigator.onLine));

    return () => {
      window.removeEventListener('online', onlineHandler);
      window.removeEventListener('offline', offlineHandler);
    }
  }, [dispatch, startSynchronization]);
}