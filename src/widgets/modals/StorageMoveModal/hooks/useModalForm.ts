import {FormikHelpers, useFormik} from "formik";
import {FormStateType} from "../types/formTypes";
import {formValidate} from "../lib/formValidate";
import {IStorage} from "../../../../entities/Storage";

const useModalForm = (
  onSubmit: (values: FormStateType, formikHelpers: FormikHelpers<FormStateType>) => (void | Promise<any>),
  storage: IStorage
) => {
  return useFormik<FormStateType>({
    initialValues: {count: '', destinationStorageId: ''},
    validate: (values) => formValidate(values, storage),
    onSubmit: onSubmit
  });
};

export default useModalForm;