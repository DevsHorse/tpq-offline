import React, {memo, PropsWithChildren} from 'react';
import {Text} from '@chakra-ui/react';

const TableHeaderItem = (props: PropsWithChildren) => {
	return (
		<Text
			justifyContent='space-between'
			align='center'
			fontSize={{ sm: '10px', lg: '12px' }}
			color='gray.400'
		>
			{props.children}
		</Text>
	);
};

export default memo(TableHeaderItem);