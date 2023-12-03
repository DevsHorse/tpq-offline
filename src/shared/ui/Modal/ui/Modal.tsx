import React, { ReactElement } from 'react';
import {
  Button,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { IModal } from '../types/Modal';

type PropsType = {
  title: string;
  bodyElement: ReactElement;
  buttons: {
    submit?: {
      text: string;
      isDisabled?: boolean;
      isLoading?: boolean;
    };
    cancel?: string;
  };
  onSubmit: () => void;
} & IModal;

const Modal = (props: PropsType) => {
  const { isOpen, onClose, title, bodyElement, buttons, onSubmit } = props;

  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent data-testid="Modal">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>{bodyElement}</ModalBody>
        <ModalFooter>
          <Button
            colorScheme="brand"
            mr={3}
            onClick={onSubmit}
            isDisabled={!!buttons.submit?.isDisabled}
            isLoading={!!buttons.submit?.isLoading}
            data-testid="Modal.SubmitButton"
          >
            {buttons.submit?.text || 'Submit'}
          </Button>
          <Button data-testid="Modal.CancelButton" onClick={onClose}>
            {buttons.cancel || 'Cancel'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
