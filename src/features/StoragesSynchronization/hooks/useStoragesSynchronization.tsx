import {useEffect} from 'react';
import {useToast} from '@chakra-ui/react';
import {useSelector} from 'react-redux';
import {StoragesSynchronizationToastContent} from '../ui/StoragesSynchronizationToastContent';
import {OfflineStorageApi, IStorage} from '../../../entities/Storage';
import {
	getStorageSynchronizationInformation,
	getStorageSynchronizationLoading
} from '../selectors/storageSynchronizationSelectors';


const useStoragesSynchronization = (currentStorages: IStorage[]) => {
	const isLoading = useSelector(getStorageSynchronizationLoading);
	const synthInformation = useSelector(getStorageSynchronizationInformation);
	const toast = useToast({
		status: 'error',
	});

	useEffect(() => {
		if (synthInformation?.length && !isLoading) {
			for (const item of synthInformation) {
				if (!item.success) {
					toast({
						title: <StoragesSynchronizationToastContent information={item} />,
						duration: 30000,
						isClosable: true,
					});
				}
			}
		}
	}, [synthInformation, isLoading, toast]);

	useEffect(() => {
		OfflineStorageApi.getInstance().setStorages(currentStorages);
	}, [currentStorages]);
};

export default useStoragesSynchronization;