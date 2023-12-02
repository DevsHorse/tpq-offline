import React, {memo, PropsWithChildren} from 'react';
import {Flex, Skeleton, Td, Tr} from '@chakra-ui/react';

type PropsType = {
  isLoading: boolean;
  columnsLength: number;
} & PropsWithChildren;

const TableBodyLoader = ({isLoading, columnsLength, children}: PropsType) => {
	return (
		<>
			{isLoading ? new Array(3).fill(1).map((_, index) => (
				<Tr key={index}>
					{new Array(columnsLength).fill(1).map((_, index) => (
						<Td key={index} minW={{ sm: 'auto', md: '200px', lg: 'auto' }}
							borderColor='transparent'>
							<Skeleton height="37px" width="100%" />
						</Td>
					))}
					<Td>
						<Flex justifyContent="flex-end">
							<Skeleton height="37px" width="37px" />
						</Flex>
					</Td>
				</Tr>
			)) : children}
		</>
	);
};

export default memo(TableBodyLoader);