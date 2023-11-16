import React, {memo, useMemo} from 'react';
import {
  MdOutlineAddCircleOutline,
  MdOutlineDriveFileMove, MdOutlineInventory2,
  MdRemoveCircleOutline
} from 'react-icons/md';
import {ThreeDotsMenu} from "../../../../shared/ui/ThreeDotsMenu";

type PropsType = {
  onAdd: () => void;
  onUse: () => void;
  onMove: () => void;
  onInventory: () => void;
}

const StorageMenu = (props: PropsType) => {
  const { onAdd, onUse, onMove, onInventory } = props;

  const listItems = useMemo(() => {
    return [
      {
        text: 'Add',
        icon: MdOutlineAddCircleOutline,
        action: onAdd
      },
      {
        text: 'Use',
        icon: MdRemoveCircleOutline,
        action: onUse
      },
      {
        text: 'Move',
        icon: MdOutlineDriveFileMove,
        action: onMove
      },
      {
        text: 'Inventory',
        icon: MdOutlineInventory2,
        action: onInventory
      }
    ]
  }, [onAdd, onUse, onMove, onInventory]);

  return (
    <ThreeDotsMenu items={listItems} />
  );
}

export default memo(StorageMenu);