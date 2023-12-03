import { FormikHelpers, useFormik } from 'formik';
import { FormStateType } from '../types/formTypes';
import { formValidate } from '../lib/formValidate';

const useModalForm = (
  onSubmit: (
    values: FormStateType,
    formikHelpers: FormikHelpers<FormStateType>,
  ) => void | Promise<never>,
) => {
  return useFormik<FormStateType>({
    initialValues: { count: '' },
    validate: formValidate,
    onSubmit: onSubmit,
  });
};

export default useModalForm;
