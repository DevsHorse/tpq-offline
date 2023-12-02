import React from 'react';
import {flexRender, Table} from '@tanstack/react-table';
import {Flex, Tbody, Td, Tr} from '@chakra-ui/react';
import {StorageMenu} from '../../../../features/StorageMenu';
import {StorageActionModals, IStorage} from '../../../../entities/Storage';
import TableBodyLoader from '../TableBodyLoader/TableBodyLoader';

type PropsType = {
  table: Table<IStorage>;
  openStorageModal: (currentStorage: IStorage, modal: StorageActionModals) => void;
  isLoading: boolean;
}

const TableBody = (props: PropsType) => {
	const {table, isLoading, openStorageModal} = props;

	return (
		<Tbody>
			<TableBodyLoader isLoading={isLoading} columnsLength={table.options.columns.length}>
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
							<Td minW={{ sm: 'auto', md: 'auto', lg: 'auto' }} borderColor='transparent'>
								<Flex justifyContent="flex-end">
									<StorageMenu
										rowId={row.id}
										storage={row.original}
										onAdd={() => openStorageModal(row.original, StorageActionModals.ADD)}
										onUse={() => openStorageModal(row.original, StorageActionModals.USE)}
										onMove={() => openStorageModal(row.original, StorageActionModals.MOVE)}
										onInventory={() => openStorageModal(row.original, StorageActionModals.INVENTORY)}
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