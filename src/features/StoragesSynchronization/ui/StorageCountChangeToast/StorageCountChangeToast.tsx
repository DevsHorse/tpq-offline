import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { SynchronizationInformation } from '../../types/SynchronizationInformation';
import { UpdateStorageType } from '../../../../entities/Storage';

type PropsType = {
  action: Exclude<
    SynchronizationInformation['action'],
    {
      type: UpdateStorageType.MOVE;
    }
  >;
};

const StorageCountChangeToast = ({ action }: PropsType) => {
  return (
    <>
      <Box>
        <Text>
          <>Storage: {action.storages[action.data.storageId].name}</>
        </Text>
      </Box>
      <Box>
        <>Count: {action.data.count}</>
      </Box>
    </>
  );
};

export default StorageCountChangeToast;
