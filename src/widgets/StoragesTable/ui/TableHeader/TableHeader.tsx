import React, { memo } from 'react';
import {Flex, Th, Thead, Tr, useColorModeValue} from '@chakra-ui/react';
import {flexRender, Table} from '@tanstack/react-table';
import {IStorage} from '../../../../entities/Storage';

type PropsType = {
  table: Table<IStorage>
}

const TableHeader = ({table}: PropsType) => {
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

	return (
		<Thead>
			{table.getHeaderGroups().map((headerGroup) => (
				<Tr key={headerGroup.id}>
					{headerGroup.headers.map((header) => {
						return (
							<Th
								key={header.id}
								colSpan={header.colSpan}
								pe='10px'
								borderColor={borderColor}
								cursor='pointer'>
								<Flex
									justifyContent='space-between'
									align='center'
									fontSize={{ sm: '10px', lg: '12px' }}
									color='gray.400'
								>
									{flexRender(header.column.columnDef.header, header.getContext())}{{
										asc: '',
										desc: '',
									}[header.column.getIsSorted() as string] ?? null}
								</Flex>
							</Th>
						);
					})}
					<Th pe='10px' borderColor={borderColor}></Th>
				</Tr>
			))}
		</Thead>
	);
};

export default memo(TableHeader);