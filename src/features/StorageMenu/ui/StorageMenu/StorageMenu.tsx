import React, {memo, useMemo} from 'react';
import {
  MdOutlineAddCircleOutline,
  MdOutlineDriveFileMove, MdOutlineInventory2,
  MdRemoveCircleOutline
} from 'react-icons/md';
import {ThreeDotsMenu} from "../../../../shared/ui/ThreeDotsMenu";
import {IStorage} from "../../../../entities/Storage";

type PropsType = {
  storage: IStorage;
  onAdd: () => void;
  onUse: () => void;
  onMove: () => void;
  onInventory: () => void;
}

const StorageMenu = (props: PropsType) => {
  const { onAdd, onUse, onMove, onInventory, storage } = props;
  const {productsCount} = storage;

  const listItems = useMemo(() => {
    return [
      {
        text: 'Add',
        icon: MdOutlineAddCircleOutline,
        action: onAdd,
      },
      {
        text: 'Use',
        icon: MdRemoveCircleOutline,
        action: onUse,
        isDisabled: productsCount === 0,
      },
      {
        text: 'Move',
        icon: MdOutlineDriveFileMove,
        action: onMove,
        isDisabled: productsCount === 0
      },
      {
        text: 'Inventory',
        icon: MdOutlineInventory2,
        action: onInventory
      }
    ]
  }, [onAdd, onUse, onMove, onInventory, productsCount]);

  return (
    <ThreeDotsMenu items={listItems} />
  );
}

export default memo(StorageMenu);