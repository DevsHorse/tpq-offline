import React, {PropsWithChildren, useState} from 'react';
import {useDisclosure} from "@chakra-ui/react";
import {StorageAddModal} from "../../../../widgets/modals/StorageAddModal";
import {IStorage} from "../../../../entities/Storage";
import {
  StorageActionModalsContext, StorageActionModalsContextDataType,
} from "../../../contexts/StorageActionModalsContext";
import StorageInventoryModal from "../../../../widgets/modals/StorageInventoryModal/ui/StorageInventoryModal";
import {StorageMoveModal} from "../../../../widgets/modals/StorageMoveModal";
import {StorageUseModal} from "../../../../widgets/modals/StorageUseModal";
import {StorageActionModals} from "../../../../shared/types/storageActionModals";

const initialModalDataState = {
  currentStorage: {} as IStorage,
}

const StorageAddModalProvider = ({children}: PropsWithChildren) => {
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isUseOpen, onOpen: onUseOpen, onClose: onUseClose } = useDisclosure();
  const { isOpen: isMoveOpen, onOpen: onMoveOpen, onClose: onMoveClose } = useDisclosure();
  const { isOpen: isInventoryOpen, onOpen: onInventoryOpen, onClose: onInventoryClose } = useDisclosure();
  const [modalData, setModalData] = useState<StorageActionModalsContextDataType>(initialModalDataState);

  const modals = {
    [StorageActionModals.ADD]: {isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose},
    [StorageActionModals.USE]: {isOpen: isUseOpen, onOpen: onUseOpen, onClose: onUseClose},
    [StorageActionModals.MOVE]: {isOpen: isMoveOpen, onOpen: onMoveOpen, onClose: onMoveClose},
    [StorageActionModals.INVENTORY]: {isOpen: isInventoryOpen, onOpen: onInventoryOpen, onClose: onInventoryClose},
  }

  return (
    <StorageActionModalsContext.Provider
      value={{
        openModal: (options) => {
          setModalData({
            currentStorage: options.data.currentStorage
          })
          modals[options.modal].onOpen();
        },
        closeModal: (modal: StorageActionModals) => {
          modals[modal].onClose();
          setModalData(initialModalDataState)
        }
      }}
    >
      <StorageAddModal
        isOpen={isAddOpen}
        onClose={onAddClose}
        currentStorage={modalData.currentStorage}
      />
      <StorageUseModal
        isOpen={isUseOpen}
        onClose={onUseClose}
        currentStorage={modalData.currentStorage}
      />
      <StorageMoveModal
        isOpen={isMoveOpen}
        onClose={onMoveClose}
        currentStorage={modalData.currentStorage}
      />
      <StorageInventoryModal
        isOpen={isInventoryOpen}
        onClose={onInventoryClose}
        currentStorage={modalData.currentStorage}
      />
      {children}
    </StorageActionModalsContext.Provider>
  );
};

export default StorageAddModalProvider;