import {createAsyncThunk} from '@reduxjs/toolkit';
import StorageApi from '../../api/StorageApi';
import {IStorage} from '../../types/Storage';
import {getThunkError} from '../../../../../shared/utils';


export const storageAdd = createAsyncThunk<
  IStorage,
  {storageId: string, count: number},
  {rejectValue: string}
>(
	'storage/add',
	async (data, thunkApi) => {
		try {
			const response = await new StorageApi().storageAdd(data);
			return response.data;
		} catch (e) {
			return thunkApi.rejectWithValue(getThunkError(e));
		}
	});