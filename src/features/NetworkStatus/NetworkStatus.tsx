import React, {useMemo} from 'react';
import {CircleIcon} from "../../shared/ui/CircleIcon";
import {Box} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {getNetworkStatusAsString} from "../../shared/network";

const NetworkStatus = () => {
  const networkStatus = useSelector(getNetworkStatusAsString);

  const statuses = useMemo(() => ({
    online: {
      text: 'Online',
      color: 'green.500'
    },
    offline: {
      text: 'Offline',
      color: 'red.500'
    }
  }), [])

  return (
    <Box display="flex" gap="10px" alignItems="center">
      {statuses[networkStatus].text}
      <CircleIcon color={statuses[networkStatus].color} />
    </Box>
  );
};

export default NetworkStatus;