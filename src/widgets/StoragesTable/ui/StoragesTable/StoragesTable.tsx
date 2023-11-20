import React, {useMemo} from 'react';
import {Flex, Box, Table, Text, useColorModeValue, Skeleton} from '@chakra-ui/react';
import {createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Card} from "../../../../shared/ui/Card";
import {useSelector} from "react-redux";
import {getStoragesList, getStoragesPageLoading} from "../../../../pages/StoragesPage";
import {IStorage} from "../../../../entities/Storage";
import {TableHeaderItem} from "../TableHeaderItem";
import {TableCellItem} from "../TableCellItem";
import {TableHeader} from "../TableHeader";
import {TableBody} from "../TableBody";

const columnHelper = createColumnHelper<IStorage>();

const StoragesTable = () => {
  const storages = useSelector(getStoragesList);
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  const columns = useMemo(() => {
    return [
      columnHelper.accessor('name', {
        id: 'name',
        header: () => <TableHeaderItem>NAME</TableHeaderItem>,
        cell: (info) => <TableCellItem>{info.getValue()}</TableCellItem>
      }),
      columnHelper.accessor('productsCount', {
        id: 'productsCount',
        header: () => <TableHeaderItem>PRODUCTS</TableHeaderItem>,
        cell: (info) => <TableCellItem>{info.getValue()}</TableCellItem>
      })
    ]
  }, []);

  const table = useReactTable({
    data: storages,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <Card flexDirection='column' w='100%' px='0px'>
      <Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
        <Text color={textColor} fontSize='22px' mb="4px" fontWeight='700' lineHeight='100%'>
          Storages
        </Text>
      </Flex>
      <Box>
        <Table variant='simple' color='gray.500' mb='24px' mt="12px">
          <TableHeader table={table} />
          <TableBody table={table} />
        </Table>
      </Box>
    </Card>
  );
};

export default StoragesTable;