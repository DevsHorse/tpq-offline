import React, {memo, ReactElement} from 'react';
import {Box} from "@chakra-ui/react";
import {useRouteParams} from "../../../lib";

interface PropsType {
  className?: string;
  header?: ReactElement;
  content: ReactElement;
}

export const MainLayout = ({content, header}: PropsType) => {
  const {isHeaderDisplay} = useRouteParams();

  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      pt={isHeaderDisplay ? "12px" : "0"}
      bg="rgb(244 247 254)"
    >
      {isHeaderDisplay && header}
      <Box
        display="flex"
        flexDirection="column"
        flexGrow="1"
      >
        {content}
      </Box>
    </Box>
  );
};

export default memo(MainLayout);