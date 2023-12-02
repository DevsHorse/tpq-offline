import {useEffect} from 'react';
import {useAppDispatch} from '../../../shared/lib';
import {isOnline} from '../../../shared/utils';
import { networkActions } from '../model/slice/networkSlice';


export const useNetworkSetup = (startSynchronization: () => void) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const onlineHandler = () => {
			dispatch(networkActions.changeStatus(true));
			startSynchronization();
		};

		const offlineHandler = () => {
			dispatch(networkActions.changeStatus(false));
		};

		window.addEventListener('online', onlineHandler);
		window.addEventListener('offline', offlineHandler);
		dispatch(networkActions.changeStatus(isOnline()));

		return () => {
			window.removeEventListener('online', onlineHandler);
			window.removeEventListener('offline', offlineHandler);
		};
	}, [dispatch, startSynchronization]);
};