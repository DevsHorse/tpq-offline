import {createAsyncThunk} from '@reduxjs/toolkit';
import {storagesSynchronization} from '../../../../../features/StoragesSynchronization';
import {getStorages} from '../getStorages/getStorages';
import {getThunkError} from '../../../../../shared/utils';


export const storagesPageSynchronization = createAsyncThunk(
	'storagesPage/appSynchronization',
	async (data, thunkApi) => {
		const {rejectWithValue, dispatch} = thunkApi;

		try {
			await dispatch(storagesSynchronization());
			await dispatch(getStorages());
		} catch (e) {
			return rejectWithValue(getThunkError(e));
		}
	});