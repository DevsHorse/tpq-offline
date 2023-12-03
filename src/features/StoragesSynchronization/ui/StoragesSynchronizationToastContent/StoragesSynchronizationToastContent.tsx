import React, { memo, useMemo } from 'react';
import { Box } from '@chakra-ui/react';
import { SynchronizationInformation } from '../../types/SynchronizationInformation';
import { UpdateStorageType } from '../../../../entities/Storage';
import { StorageMoveToast } from '../StorageMoveToast';
import { StorageCountChangeToast } from '../StorageCountChangeToast';

type PropsType = {
  information: SynchronizationInformation;
};

const StoragesSynchronizationToastContent = ({ information }: PropsType) => {
  const content = useMemo(() => {
    switch (information.action.type) {
      case UpdateStorageType.ADD:
      case UpdateStorageType.USE:
      case UpdateStorageType.INVENTORY: {
        return <StorageCountChangeToast action={information.action} />;
      }
      case UpdateStorageType.MOVE: {
        return <StorageMoveToast action={information.action} />;
      }
    }
  }, [information]);

  return (
    <Box>
      <Box>Synchronization error</Box>
      <Box>Type: {information.action.type}</Box>
      {content}
    </Box>
  );
};

export default memo(StoragesSynchronizationToastContent);
