import {createContext} from "react";
import {IStorage} from "../../entities/Storage";
import {StorageActionModals} from "../../entities/Storage";

export type StorageActionModalsContextDataType = {
  currentStorage: IStorage;
}

export type StorageActionModalsContextOpenDataType = {
  modal: StorageActionModals
  data: StorageActionModalsContextDataType
}

export const StorageActionModalsContext = createContext({
  openModal: (options: StorageActionModalsContextOpenDataType) => {}
});