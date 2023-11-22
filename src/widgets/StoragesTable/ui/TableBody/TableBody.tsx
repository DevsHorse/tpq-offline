import React, {useCallback} from 'react';
import {flexRender, Table} from "@tanstack/react-table";
import {IStorage} from "../../../../entities/Storage";
import {Flex, Tbody, Td, Tr} from "@chakra-ui/react";
import {StorageMenu} from "../../../../features/StorageMenu";
import {useStorageActionModalsContext} from "../../../../app/hooks/useStorageActionModalsContext";
import {StorageActionModals} from "../../../../shared/types/storageActionModals";
import {useSelector} from "react-redux";
import {getStoragesPageLoading} from "../../../../pages/StoragesPage";
import TableBodyLoader from "../TableBodyLoader/TableBodyLoader";

type PropsType = {
  table: Table<IStorage>
}

const TableBody = ({table}: PropsType) => {
  const isPageLoading = useSelector(getStoragesPageLoading);
  const {openModal: openStorageActionModal} = useStorageActionModalsContext();

  const openModal = useCallback((currentStorage: IStorage, modal: StorageActionModals) => {
    openStorageActionModal({modal, data: {currentStorage}});
  }, [openStorageActionModal]);

  return (
    <Tbody>
      <TableBodyLoader isLoading={isPageLoading} columnsLength={table.options.columns.length}>
        {table.getRowModel().rows.map((row) => {
          return (
            <Tr key={row.id} data-testid="StoragesPage.Storage">
              {row.getVisibleCells().map((cell) => {
                return (
                  <Td
                    key={cell.id}
                    data-testid={`StoragesPage.Storage.Cell(${cell.id})`}
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
                    rowId={row.id}
                    storage={row.original}
                    onAdd={() => openModal(row.original, StorageActionModals.ADD)}
                    onUse={() => openModal(row.original, StorageActionModals.USE)}
                    onMove={() => openModal(row.original, StorageActionModals.MOVE)}
                    onInventory={() => openModal(row.original, StorageActionModals.INVENTORY)}
                  />
                </Flex>
              </Td>
            </Tr>
          );
        })}
      </TableBodyLoader>
    </Tbody>
  );
};

export default TableBody;