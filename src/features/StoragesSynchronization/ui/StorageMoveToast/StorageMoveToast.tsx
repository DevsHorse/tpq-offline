import React from 'react';
import {Box, Text} from '@chakra-ui/react';
import {SynchronizationInformation} from '../../types/SynchronizationInformation';
import {UpdateStorageType} from '../../../../entities/Storage';

type PropsType = {
  action: Extract<SynchronizationInformation['action'], {
    type: UpdateStorageType.MOVE
  }>;
}

const StorageMoveToast = ({action}: PropsType) => {
	return (
		<>
			<Box>
				<Text>
					<>From: {action.storages[action.data.sourceStorageId].name}</>
				</Text>
			</Box>
			<Box>
				<Text>
					<>To: {action.storages[action.data.destinationStorageId].name}</>
				</Text>
			</Box>
			<Box>
				<>Count: {action.data.count}</>
			</Box>
		</>
	);
};

export default StorageMoveToast;