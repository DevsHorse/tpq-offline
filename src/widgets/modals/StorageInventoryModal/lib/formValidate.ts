import {FormErrorsType, FormStateType} from "../types/formTypes";
import {validateFieldNumber} from "../../../../shared/lib/validators/validateFieldNumber";

export const formValidate = (values: FormStateType): FormErrorsType => {
  const errors: FormErrorsType = {};

  if (!validateFieldNumber(+values.count)) {
    errors.count =  'Incorrect value';
  }

  return errors;
}