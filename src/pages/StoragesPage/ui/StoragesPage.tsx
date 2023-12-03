import React, { useCallback, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { StoragesTable } from '../../../widgets/StoragesTable';
import { getStorages } from '../model/services/getStorages/getStorages';
import { useAppDispatch } from '../../../shared/lib';
import { IStorage, StorageActionModals } from '../../../entities/Storage';
import { useSelector } from 'react-redux';
import {
  getStoragesList,
  getStoragesPageLoading,
} from '../model/selectors/storagesPageSelectors';
import { useStorageActionModalsContext } from '../../../app/hooks/useStorageActionModalsContext';
import { storagesPageActions } from '../model/slice/storagesPageSlice';
import { useStoragesSynchronization } from '../../../features/StoragesSynchronization';

const StoragesPage = () => {
  const dispatch = useAppDispatch();
  const storages = useSelector(getStoragesList);
  const isPageLoading = useSelector(getStoragesPageLoading);
  const { openModal: openStorageActionModal } = useStorageActionModalsContext();

  useStoragesSynchronization(storages);

  useEffect(() => {
    dispatch(getStorages());
  }, [dispatch]);

  const openStorageModal = useCallback(
    (currentStorage: IStorage, modal: StorageActionModals) => {
      openStorageActionModal({
        modal,
        data: {
          currentStorage,
          updateStorages: (newStorage: IStorage) => {
            dispatch(storagesPageActions.updateStorage(newStorage));
          },
        },
      });
    },
    [openStorageActionModal, dispatch],
  );

  return (
    <Box
      p={{ lg: '40px', sm: '15px' }}
      h="100%"
      flexGrow="1"
      data-testid="StoragesPage"
    >
      <StoragesTable
        isLoading={isPageLoading}
        storages={storages}
        openStorageModal={openStorageModal}
      />
    </Box>
  );
};

export default StoragesPage;
