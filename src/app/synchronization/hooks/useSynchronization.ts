import {useSelector} from "react-redux";
import {useCallback, useEffect, useRef} from "react";
import {useToast} from "@chakra-ui/react";
import {synchronization} from "../services/synchronization/synchronization";
import {useAppDispatch} from "../../../shared/lib";
import {getSynchronizationLoading} from "../selectors/synchronizationSelectors";
import useStorageSynchronization from "../../../features/StorageSynchronization/hooks/useStorageSynchronization";


const useSynchronization = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getSynchronizationLoading);
  const toastIdRef: any = useRef(null);
  const toast = useToast({
    status: "info",
  });

  const startSynchronization = useCallback(() => {
    dispatch(synchronization());
  }, [dispatch]);

  useEffect(() => {
    if (navigator.onLine) {
      startSynchronization();
    }
  }, [startSynchronization]);

  useEffect(() => {
    if (isLoading && !toastIdRef.current) {
      toastIdRef.current = toast({
        title: "Synchronization...",
        duration: 10000000000
      });
    } else if (toastIdRef.current) {
      toast.close(toastIdRef.current);
      toastIdRef.current = null;
    }
  }, [isLoading, toast]);

  useStorageSynchronization();

  return {startSynchronization};
}

export default useSynchronization;