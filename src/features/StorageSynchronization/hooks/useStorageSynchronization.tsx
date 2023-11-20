import {useSelector} from "react-redux";
import {
  getStorageSynchronizationInformation,
  getStorageSynchronizationLoading
} from "../selectors/storageSynchronizationSelectors";
import {useEffect} from "react";
import {useToast} from "@chakra-ui/react";
import StorageSynchronizationToastContent
  from "../ui/StorageSynchronizationToastContent/StorageSynchronizationToastContent";
import {getStoragesList} from "../../../pages/StoragesPage";
import {StorageApi} from "../../../entities/Storage";

const storagesApi = new StorageApi();

const useStorageSynchronization = () => {
  const storages = useSelector(getStoragesList);
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

  useEffect(() => {
    storagesApi.offlineApi.db.setStorages(storages);
  }, [storages]);
}

export default useStorageSynchronization;