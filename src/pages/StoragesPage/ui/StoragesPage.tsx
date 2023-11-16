import React, {useEffect} from 'react';
import {Box} from "@chakra-ui/react";
import {StoragesTable} from "../../../widgets/StoragesTable";
import {getStorages} from "../model/services/getStorages/getStorages";
import {useAppDispatch} from "../../../shared/lib";
import {useSelector} from "react-redux";
import {getStoragesPageLoading} from "../model/selectors/storagesPageSelectors";

const StoragesPage = () => {
  const isPageLoading = useSelector(getStoragesPageLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getStorages());
  }, []);

  return (
    <Box
      p="40px"
      h="100%"
      flexGrow="1"
    >
      {isPageLoading ? null : (
        <StoragesTable />
      )}
    </Box>
  );
};

export default StoragesPage;