import {useCallback, useState} from 'react';
import {IModal, Modal} from '../../../../shared/ui/Modal';
import {FormControl, FormErrorMessage, FormLabel, Select} from '@chakra-ui/react';
import {CountInput, storageMove, useStorageResponseNotification} from '../../../../entities/Storage';
import {useAppDispatch} from '../../../../shared/lib';
import {FormikHelpers} from 'formik';
import {FormStateType} from '../types/formTypes';
import useModalForm from '../hooks/useModalForm';
import {useSelector} from 'react-redux';
import {getFilteredStoragesList} from '../../../../pages/StoragesPage';
import {StorageActionModalsContextDataType} from '../../../../app/contexts/StorageActionModalsContext';
import {AnyAction} from '@reduxjs/toolkit';



type PropsType = StorageActionModalsContextDataType & IModal;

const StorageMoveModal = (props: PropsType) => {
	const {currentStorage, onClose, updateStorages} = props;

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
			.then((action: AnyAction) => {
				setIsLoading(false);
				displayNotification(!action.error, action.payload);

				if (updateStorages && !action.error) {
					updateStorages(action.payload.source);
					updateStorages(action.payload.destination);
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
							data-testid="Input.Select"
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