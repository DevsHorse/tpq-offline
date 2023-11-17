import {createContext} from "react";
import {IStorage} from "../../entities/Storage";
import {StorageActionModals} from "../../shared/types/storageActionModals";

export type StorageActionModalsContextDataType = {
  currentStorage: IStorage;
}

export type StorageActionModalsContextOpenDataType = {
  modal: StorageActionModals
  data: StorageActionModalsContextDataType
}

export const StorageActionModalsContext = createContext({
  closeModal: (modal: StorageActionModals) => {},
  openModal: (options: StorageActionModalsContextOpenDataType) => {}
});