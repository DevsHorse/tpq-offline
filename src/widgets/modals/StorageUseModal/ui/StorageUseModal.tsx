import {useCallback, useState} from 'react';
import {IModal, Modal} from '../../../../shared/ui/Modal';
import {CountInput, storageUse, useStorageResponseNotification} from '../../../../entities/Storage';
import {useAppDispatch} from '../../../../shared/lib';
import {FormikHelpers} from 'formik';
import {FormStateType} from '../types/formTypes';
import useModalForm from '../hooks/useModalForm';
import {StorageActionModalsContextDataType} from '../../../../app/contexts/StorageActionModalsContext';
import {AnyAction} from '@reduxjs/toolkit';



type PropsType = StorageActionModalsContextDataType & IModal;

const StorageUseModal = (props: PropsType) => {
	const {currentStorage, onClose, updateStorages} = props;

	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const {displayNotification} = useStorageResponseNotification();

	const handleSubmit = useCallback((values: FormStateType, formikHelpers: FormikHelpers<FormStateType>) => {
		setIsLoading(true);

		dispatch(storageUse({
			storageId: currentStorage.id,
			count: Number(values.count)
		}))
			.then((action: AnyAction) => {
				setIsLoading(false);
				displayNotification(!action.error, action.payload);

				if (updateStorages) {
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
	} = useModalForm(handleSubmit, currentStorage);

	const handleClose = useCallback(() => {
		resetForm();
		onClose();
	}, [onClose, resetForm]);

	return (
		<Modal
			isOpen={props.isOpen}
			onClose={handleClose}
			title="Use products"
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
					text: 'Use',
					isDisabled: !isFormValid,
					isLoading: isLoading,
				}
			}}
			onSubmit={submitForm}
		/>
	);
};

export default StorageUseModal;