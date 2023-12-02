import {FormErrorsType, FormStateType} from '../types/formTypes';
import {IStorage} from '../../../../entities/Storage';
import {validateFieldNumber} from '../../../../shared/lib';
import {validateMaxNumber} from '../../../../shared/lib';


export const formValidate = (values: FormStateType, storage: IStorage): FormErrorsType => {
	const errors: FormErrorsType = {};

	if (!validateFieldNumber(+values.count)) {
		errors.count =  'Incorrect value';
	}

	if (!validateMaxNumber(+values.count, storage.productsCount)) {
		errors.count =  'Max value is ' + storage.productsCount;
	}

	if (!values.destinationStorageId) {
		errors.destinationStorageId = 'Select storage';
	}

	return errors;
};