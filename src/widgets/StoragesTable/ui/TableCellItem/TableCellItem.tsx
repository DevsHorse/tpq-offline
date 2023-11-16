import React, {memo, PropsWithChildren} from 'react';
import {Text, useColorModeValue} from "@chakra-ui/react";

const TableCellItem = (props: PropsWithChildren) => {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  return (
    <Text color={textColor} fontSize='sm' fontWeight='700'>
      {props.children}
    </Text>
  );
};

export default memo(TableCellItem);