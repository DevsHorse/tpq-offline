import React, {PropsWithChildren} from 'react';
import theme from "../../../theme/theme";
import {ChakraProvider} from "@chakra-ui/react";

const ThemeProvider = (props: PropsWithChildren) => {
  return (
    <ChakraProvider
      theme={theme}
      toastOptions={{
        defaultOptions: {
          position: 'bottom-right',
          duration: 5000,
          isClosable: true,
        }
      }}
    >
      {props.children}
    </ChakraProvider>
  );
};

export default ThemeProvider;