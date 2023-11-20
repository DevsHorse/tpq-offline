import React, {useEffect} from 'react';
import {Box} from "@chakra-ui/react";
import {StoragesTable} from "../../../widgets/StoragesTable";
import {getStorages} from "../model/services/getStorages/getStorages";
import {useAppDispatch} from "../../../shared/lib";

const StoragesPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getStorages());
  }, [dispatch]);

  return (
    <Box
      p={{lg: "40px", sm: "15px"}}
      h="100%"
      flexGrow="1"
    >
      <StoragesTable />
    </Box>
  );
};

export default StoragesPage;