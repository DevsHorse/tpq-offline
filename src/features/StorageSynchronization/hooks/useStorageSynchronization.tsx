import {useSelector} from "react-redux";
import {
  getStorageSynchronizationInformation,
  getStorageSynchronizationLoading
} from "../selectors/storageSynchronizationSelectors";
import {useEffect} from "react";
import {useToast} from "@chakra-ui/react";
import StorageSynchronizationToastContent
  from "../ui/StorageSynchronizationToastContent/StorageSynchronizationToastContent";


const useStorageSynchronization = () => {
  const isLoading = useSelector(getStorageSynchronizationLoading);
  const synthInformation = useSelector(getStorageSynchronizationInformation);
  const toast = useToast({
    status: "error",
  });

  useEffect(() => {
    if (synthInformation?.length && !isLoading) {
      for (let item of synthInformation) {
        if (!item.success) {
          toast({
            title: <StorageSynchronizationToastContent information={item} />,
            duration: 30000,
            isClosable: true,
          })
        }
      }
    }
  }, [synthInformation, isLoading, toast]);
}

export default useStorageSynchronization;