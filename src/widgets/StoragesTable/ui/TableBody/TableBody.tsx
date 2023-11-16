import React, {memo, useCallback} from 'react';
import {flexRender, Table} from "@tanstack/react-table";
import {IStorage, storageAdd, storageInventory, storageMove, storageUse} from "../../../../entities/Storage";
import {Flex, Tbody, Td, Tr} from "@chakra-ui/react";
import {StorageMenu} from "../../../../features/StorageMenu";
import {useAppDispatch} from "../../../../shared/lib";

type PropsType = {
  table: Table<IStorage>
}

const TableBody = ({table}: PropsType) => {
  const dispatch = useAppDispatch();

  const onStorageAdd = useCallback((storage: IStorage) => {
    dispatch(storageAdd({storageId: storage.id, count: 1}));
  }, []);

  const onStorageMove = useCallback((storage: IStorage) => {
    dispatch(storageMove({sourceStorageId: storage.id, destinationStorageId: 'ZHVuZGVyIG1pZmZsaW4K', count: 5}));
  }, []);

  const onStorageUse = useCallback((storage: IStorage) => {
    dispatch(storageUse({storageId: storage.id, count: 1}));
  }, []);

  const onStorageInventory = useCallback((storage: IStorage) => {
    dispatch(storageInventory({storageId: storage.id, count: 2000}));
  }, []);

  return (
    <Tbody>
      {table.getRowModel().rows.map((row) => {
        return (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              return (
                <Td
                  key={cell.id}
                  fontSize={{ sm: '14px' }}
                  minW={{ sm: 'auto', md: '200px', lg: 'auto' }}
                  borderColor='transparent'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              );
            })}
            <Td
              minW={{ sm: 'auto', md: 'auto', lg: 'auto' }}
              borderColor='transparent'
            >
              <Flex
                justifyContent="flex-end"
              >
                <StorageMenu
                  onAdd={() => onStorageAdd(row.original)}
                  onUse={() => onStorageUse(row.original)}
                  onMove={() => onStorageMove(row.original)}
                  onInventory={() => onStorageInventory(row.original)}
                />
              </Flex>
            </Td>
          </Tr>
        );
      })}
    </Tbody>
  );
};

export default TableBody;