import React, {memo, useMemo} from 'react';
import {Box, Text} from "@chakra-ui/react";
import {SynthInformation} from "../../types/SynthInformation";
import {UpdateStorageType} from "../../../../entities/Storage";

type PropsType = {
  information: SynthInformation;
}

const StorageSynchronizationToastContent = ({information}: PropsType) => {

  const content = useMemo(() => {
    switch (information.action.type) {
      case UpdateStorageType.ADD:
      case UpdateStorageType.USE:
      case UpdateStorageType.INVENTORY: {
        return (
          <>
            <Box>
              <Text>
                <>Storage: {information.action.storages[information.action.data.storageId].name}</>
              </Text>
            </Box>
            <Box>
              <>Count: {information.action.data.count}</>
            </Box>
          </>
        )
      }
      case UpdateStorageType.MOVE: {
        return (
          <>
            <Box>
              <Text>
                <>From: {information.action.storages[information.action.data.sourceStorageId].name}</>
              </Text>
            </Box>
            <Box>
              <Text>
                <>To: {information.action.storages[information.action.data.destinationStorageId].name}</>
              </Text>
            </Box>
            <Box>
              <>Count: {information.action.data.count}</>
            </Box>
          </>
        )
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

export default memo(StorageSynchronizationToastContent);