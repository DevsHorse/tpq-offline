import {useToast} from "@chakra-ui/react";
import {useCallback} from "react";


export const useStorageResponseNotification = () => {
  const toast = useToast();

  const displayNotification = useCallback((isSuccess: boolean, error: string) => {
    if (isSuccess) {
      toast({
        title: 'Success',
        status: 'success'
      })
      return;
    }

    toast({
      title: error,
      status: 'error'
    })
  }, [toast]);

  return {displayNotification};
}