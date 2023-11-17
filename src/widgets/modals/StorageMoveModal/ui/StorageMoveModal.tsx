import {useCallback, useState} from 'react';
import {IModal, Modal} from "../../../../shared/ui/Modal";
import {FormControl, FormErrorMessage, FormLabel, Select} from "@chakra-ui/react";
import {CountInput, IStorage, storageMove, useStorageResponseNotification} from "../../../../entities/Storage";
import {useAppDispatch} from "../../../../shared/lib";
import {FormikHelpers} from "formik";
import {FormStateType} from "../types/formTypes";
import useModalForm from "../hooks/useModalForm";
import {useSelector} from "react-redux";
import {getFilteredStoragesList} from "../../../../pages/StoragesPage";

type PropsType = {
  currentStorage: IStorage;
} & IModal;

const StorageMoveModal = (props: PropsType) => {
  const {currentStorage, onClose} = props;

  const dispatch = useAppDispatch();
  const storages = useSelector(getFilteredStoragesList((storage) => storage.id !== currentStorage.id));
  const [isLoading, setIsLoading] = useState(false);
  const {displayNotification} = useStorageResponseNotification();

  const handleSubmit = useCallback((values: FormStateType, formikHelpers: FormikHelpers<FormStateType>) => {
    setIsLoading(true);

    dispatch(storageMove({
      sourceStorageId: currentStorage.id,
      destinationStorageId: values.destinationStorageId,
      count: Number(values.count)
    }))
      .then((e: any) => {
        setIsLoading(false);
        displayNotification(!e.error, e.payload);
        formikHelpers.resetForm();
        onClose();
      });
  }, [currentStorage, onClose, dispatch, displayNotification]);

  const {
    submitForm,
    resetForm,
    isValid: isFormValid,
    errors: formErrors,
    values: formValues,
    handleChange: handleFormChange,
    handleBlur: handleFormBlur,
  } = useModalForm(handleSubmit, currentStorage);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [onClose, resetForm]);

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={handleClose}
      title="Move products"
      bodyElement={(
        <>
          <FormControl mb="20px" isInvalid={!!formErrors.destinationStorageId}>
            <FormLabel>Destination storage</FormLabel>
            <Select
              id="destinationStorageId"
              name="destinationStorageId"
              placeholder="Select storage..."
              value={formValues.destinationStorageId}
              onChange={handleFormChange}
              onBlur={handleFormBlur}
            >
              {storages.map((storage) => (
                <option key={storage.id} value={storage.id}>{storage.name}</option>
              ))}
            </Select>
            <FormErrorMessage>{formErrors.destinationStorageId}</FormErrorMessage>
          </FormControl>
          <CountInput
            isInvalid={!!formErrors.count}
            value={formValues.count}
            onChange={handleFormChange}
            onBlur={handleFormBlur}
            error={formErrors.count}
          />
        </>
      )}
      buttons={{
        submit: {
          text: 'Move',
          isDisabled: !isFormValid,
          isLoading: isLoading,
        }
      }}
      onSubmit={submitForm}
    />
  );
};

export default StorageMoveModal;