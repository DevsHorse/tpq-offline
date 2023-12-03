import { useSelector } from 'react-redux';
import { useCallback, useEffect, useRef } from 'react';
import { useToast } from '@chakra-ui/react';
import { appSynchronization } from '../services/appSynchronization/appSynchronization';
import { useAppDispatch } from '../../../shared/lib';
import { getAppSynchronizationLoading } from '../selectors/appSynchronizationSelectors';
import { isOnline } from '../../../shared/utils';

const useAppSynchronization = () => {
  const dispatch = useAppDispatch();
  const isAppSynchronizationLoading = useSelector(getAppSynchronizationLoading);
  const toastIdRef: any = useRef(null);
  const toast = useToast({
    status: 'info',
  });

  const startSynchronization = useCallback(() => {
    dispatch(appSynchronization());
  }, [dispatch]);

  useEffect(() => {
    if (isOnline()) {
      startSynchronization();
    }
  }, [startSynchronization]);

  useEffect(() => {
    if (isAppSynchronizationLoading && !toastIdRef.current) {
      toastIdRef.current = toast({
        title: 'Synchronization...',
        duration: 10000000000,
      });
    } else if (toastIdRef.current) {
      toast.close(toastIdRef.current);
      toastIdRef.current = null;
    }
  }, [isAppSynchronizationLoading, toast]);

  return { startSynchronization };
};

export default useAppSynchronization;
