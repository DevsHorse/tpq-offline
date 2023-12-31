import { FormikValues } from 'formik';
import { FormErrorsType } from '../types/formTypes';
import { IStorage } from '../../../../entities/Storage';
import { validateFieldNumber } from '../../../../shared/lib';
import { validateMaxNumber } from '../../../../shared/lib';

export const formValidate = (
  values: FormikValues,
  storage: IStorage,
): FormErrorsType => {
  const errors: FormErrorsType = {};

  if (!validateFieldNumber(+values.count)) {
    errors.count = 'Incorrect value';
  }

  if (!validateMaxNumber(+values.count, storage.productsCount)) {
    errors.count = 'Max value is ' + storage.productsCount;
  }

  return errors;
};
