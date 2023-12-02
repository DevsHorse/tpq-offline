import React, {useMemo} from 'react';
import {CircleIcon} from '../../../shared/ui/CircleIcon';
import {Box} from '@chakra-ui/react';
import {useSelector} from 'react-redux';
import {getNetworkStatusAsString} from '../model/selectors/networkSelectors';


const NetworkStatus = () => {
	const networkStatus = useSelector(getNetworkStatusAsString);

	const statuses = useMemo(() => ({
		online: {
			text: 'Online',
			color: 'green.500'
		},
		offline: {
			text: 'Offline',
			color: 'red.500'
		}
	}), []);

	return (
		<Box data-testid="NetworkStatus" display="flex" gap="10px" alignItems="center">
			{statuses[networkStatus].text}
			<CircleIcon color={statuses[networkStatus].color} />
		</Box>
	);
};

export default NetworkStatus;