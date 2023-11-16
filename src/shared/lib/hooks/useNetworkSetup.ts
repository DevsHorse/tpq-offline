import {useEffect} from "react";
import {useAppDispatch} from "./useAppDispatch";
import {networkActions} from "../../network";


export const useNetworkSetup = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.addEventListener('online', (e) => {
      dispatch(networkActions.changeStatus(true));
    })
    window.addEventListener('offline', (e) => {
      dispatch(networkActions.changeStatus(false));
    })
    dispatch(networkActions.changeStatus(navigator.onLine));
  }, []);
}