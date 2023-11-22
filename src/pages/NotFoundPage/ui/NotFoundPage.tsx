import { type FC } from 'react';
import {Box, Heading} from "@chakra-ui/react";

const NotFoundPage: FC = () => {
  return (
    <Box data-testid="NotFoundPage" flexGrow="1" display="flex" alignItems="center" justifyContent="center">
      <Heading textAlign="center" as="h2">
        Page doesn't exist
      </Heading>
    </Box>
  );
};

export default NotFoundPage;
