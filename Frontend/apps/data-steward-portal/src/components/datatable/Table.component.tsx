import {
  Box,
  Thead,
  Tr,
  Th,
  HStack,
  Tbody,
  Td,
  Table,
  Flex,
  Heading,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { Column, useTable } from 'react-table';
import { AiOutlineInbox } from 'react-icons/ai';
import { CustomCell } from './productCell.component';
import { ProductResponse } from '@b2b-app-mfe/services';
import { Loading } from '@b2b-app-mfe/common-components';

type TableProps<T extends object> = {
  columns: ReadonlyArray<Column<T>>;
  data: T[];
  isLoading: boolean;
  manualPagination: boolean;
  setSelectItem: <T extends object>(item: T) => void;
  openDrawer: () => void;
};

const NoData = () => (
  <Flex
    align="center"
    justify="center"
    height="200px"
    borderWidth="1px"
    borderRadius="md"
    borderColor="gray.200"
    p="4"
  >
    <Box textAlign="center">
      <AiOutlineInbox size={40} color="#999" />
      <Heading as="h3" size="md" color="gray.500" mt="2">
        No data available
      </Heading>
    </Box>
  </Flex>
);

function DataTable<T extends object>({
  columns,
  data,
  isLoading,
  manualPagination = false,
  setSelectItem,
  openDrawer,
}: TableProps<T>) {
  const columnData = useMemo(() => columns, [columns]);
  const rowData = useMemo(() => data, [data]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: columnData,
      data: rowData,
    });
  const hasData = data && data.length > 0;
  const handleRowClick = (productData: T) => {
    setSelectItem(productData);
    openDrawer();
  };

  return isLoading ? (
    <div>
      <Loading height="400px" />
    </div>
  ) : !hasData ? (
    <div>
      <NoData />
    </div>
  ) : (
    <div style={{ height: '410px', overflowY: 'auto', overflowX: 'hidden' }}>
      <style>
        {`
          ::-webkit-scrollbar {
            width: 2px;
          }

          ::-webkit-scrollbar-thumb {
            background-color: darkgray;
          }

          ::-webkit-scrollbar-track {
            background-color: lightgray;
          }
        `}
      </style>
      <Table
        size="sm"
        boxShadow={4}
        border="1px"
        borderColor="gray.200"
        {...getTableProps()}
      >
        <Thead>
          {headerGroups.map((headerGroups) => {
            return (
              <Tr {...headerGroups.getHeaderGroupProps()}>
                {headerGroups.headers.map((column) => {
                  return (
                    <Th bgColor={'gray.100'} {...column.getHeaderProps()}>
                      <Box my="2">
                        <HStack display="flex" alignItems="center" spacing="2">
                          <Box fontWeight={'bold'} color={'teal'}>
                            {column.render('Header')}
                          </Box>
                        </HStack>
                      </Box>
                    </Th>
                  );
                })}
              </Tr>
            );
          })}
        </Thead>
        <Tbody {...getTableBodyProps()} overflowY={'scroll'}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr
                height={4}
                {...row.getRowProps()}
                onClick={() => handleRowClick(row.original)}
                bg={''}
                _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                fontSize={10}
              >
                {row.cells.map((cell) => (
                  <Td
                    {...cell.getCellProps()}
                    minW={'auto'}
                    pt={3}
                    fontWeight="semibold"
                    color={'gray.600'}
                    fontSize={12}
                    className={cell.column.id}
                  >
                    <CustomCell
                      column={cell.column.Header}
                      data={row.original as ProductResponse}
                      value={cell.render('Cell')}
                      row={row}
                    />
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </div>
  );
}

export default DataTable;
