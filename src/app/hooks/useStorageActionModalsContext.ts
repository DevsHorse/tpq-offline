import {useContext} from 'react';
import {StorageActionModalsContext} from '../contexts/StorageActionModalsContext';


export const useStorageActionModalsContext = () => {
	return useContext(StorageActionModalsContext);
};