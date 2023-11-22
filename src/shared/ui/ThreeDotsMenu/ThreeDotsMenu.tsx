import React, { memo } from 'react';
import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";
import {MdOutlineMoreHoriz} from "react-icons/md";
import {IconType} from "react-icons";

type PropsType = {
  rowId: string;
  items: {
    text: string;
    icon: IconType;
    action: () => void;
    isDisabled?: boolean;
  }[]
}

const ThreeDotsMenu = ({items, rowId}: PropsType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const iconColor = useColorModeValue('brand.500', 'white');
  const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const bgHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
  const bgFocus = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.100' });
  const textColor = useColorModeValue('secondaryGray.500', 'white');
  const bgList = useColorModeValue('white', 'whiteAlpha.100');
  const bgShadow = useColorModeValue('14px 17px 40px 4px rgba(112, 144, 176, 0.08)', 'unset');
  const textHover = useColorModeValue(
    { color: 'secondaryGray.900', bg: 'unset' },
    { color: 'secondaryGray.500', bg: 'unset' }
  );

  return (
    <Menu isOpen={isOpen} onClose={onClose}>
      <MenuButton
        alignItems='center'
        justifyContent='center'
        bg={bgButton}
        _hover={bgHover}
        _focus={bgFocus}
        _active={bgFocus}
        w='37px'
        h='37px'
        lineHeight='100%'
        onClick={onOpen}
        borderRadius='10px'
        data-testid={`StoragesPage.Storage.Button(row_${rowId})`}
      >
        <Icon as={MdOutlineMoreHoriz} color={iconColor} w='24px' h='24px' />
      </MenuButton>
      <MenuList
        w='150px'
        minW='unset'
        maxW='150px !important'
        border='transparent'
        backdropFilter='blur(63px)'
        bg={bgList}
        boxShadow={bgShadow}
        borderRadius='20px'
        p='15px'
        data-testid={`StoragesPage.Storage.Button.List(row_${rowId})`}
      >

        {items.map((item) => (
          <MenuItem
            key={item.text}
            transition='0.2s linear'
            color={textColor}
            _hover={textHover}
            p='0px'
            borderRadius='8px'
            _active={{
              bg: 'transparent'
            }}
            _focus={{
              bg: 'transparent'
            }}
            isDisabled={item.isDisabled}
            mb='10px'
            onClick={item.action}
            data-testid={`StoragesPage.Storage.Button.List.Action(row_${rowId}_${item.text})`}
          >
            <Flex align='center'>
              <Icon as={item.icon} h='16px' w='16px' me='8px' />
              <Text fontSize='sm' fontWeight='400'>
                {item.text}
              </Text>
            </Flex>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default memo(ThreeDotsMenu);