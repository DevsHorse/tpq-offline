import React from 'react';
import { Box, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import { NetworkStatus } from '../../../features/Network';

type PropsType = {
  pageName?: string;
};

const Header = ({ pageName }: PropsType) => {
  const navbarBg = useColorModeValue(
    'rgba(244, 247, 254, 0.2)',
    'rgba(11,20,55,0.5)',
  );

  return (
    <Box
      position="sticky"
      boxShadow="none"
      bg={navbarBg}
      borderColor="transparent"
      filter="none"
      backdropFilter="blur(20px)"
      backgroundPosition="center"
      backgroundSize="cover"
      borderRadius="16px"
      borderWidth="1.5px"
      borderStyle="solid"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      alignItems={{ xl: 'center' }}
      display={'flex'}
      minH="75px"
      zIndex="1000"
      justifyContent={{ xl: 'center' }}
      lineHeight="25.6px"
      mx="auto"
      mt="0px"
      pb="8px"
      px={{
        base: '15px',
      }}
      ps={{
        xl: '12px',
      }}
      pt="8px"
      top={{ base: '12px' }}
      w={{
        lg: 'calc(100vw - 80px)',
        sm: 'calc(100vw - 30px)',
      }}
    >
      <Flex w="100%" justifyContent="space-between" alignItems="center">
        <Box>
          <Heading as="h1" size="lg">
            {pageName}
          </Heading>
        </Box>
        <Box>
          <NetworkStatus />
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
