import {useCallback, useState} from 'react';
import {IModal, Modal} from '../../../../shared/ui/Modal';
import {CountInput, storageInventory, useStorageResponseNotification} from '../../../../entities/Storage';
import {useAppDispatch} from '../../../../shared/lib';
import {FormikHelpers} from 'formik';
import {FormStateType} from '../types/formTypes';
import useModalForm from '../hooks/useModalForm';
import {StorageActionModalsContextDataType} from '../../../../app/contexts/StorageActionModalsContext';
import {AnyAction} from '@reduxjs/toolkit';



type PropsType = StorageActionModalsContextDataType & IModal;

const StorageInventoryModal = (props: PropsType) => {
	const {currentStorage, onClose, updateStorages} = props;

	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const {displayNotification} = useStorageResponseNotification();

	const handleSubmit = useCallback((values: FormStateType, formikHelpers: FormikHelpers<FormStateType>) => {
		setIsLoading(true);

		dispatch(storageInventory({
			storageId: currentStorage.id,
			count: Number(values.count)
		}))
			.then((action: AnyAction) => {
				setIsLoading(false);
				displayNotification(!action.error, action.payload);

				if (updateStorages && !action.error) {
					updateStorages(action.payload);
				}

				formikHelpers.resetForm();
				onClose();
			});
	}, [currentStorage, onClose, updateStorages, dispatch, displayNotification]);

	const {
		submitForm,
		resetForm,
		isValid: isFormValid,
		errors: formErrors,
		values: formValues,
		handleChange: handleFormChange,
		handleBlur: handleFormBlur,
	} = useModalForm(handleSubmit);

	const handleClose = useCallback(() => {
		resetForm();
		onClose();
	}, [onClose, resetForm]);

	return (
		<Modal
			isOpen={props.isOpen}
			onClose={handleClose}
			title="Storage inventory"
			bodyElement={(
				<CountInput
					isInvalid={!!formErrors.count}
					value={formValues.count}
					onChange={handleFormChange}
					onBlur={handleFormBlur}
					error={formErrors.count}
				/>
			)}
			buttons={{
				submit: {
					text: 'Submit',
					isDisabled: !isFormValid,
					isLoading: isLoading,
				}
			}}
			onSubmit={submitForm}
		/>
	);
};

export default StorageInventoryModal;