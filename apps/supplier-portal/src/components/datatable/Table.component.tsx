import { Box, Thead, Tr, Th, HStack, Tbody, Td, Table } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { Column, useTable } from 'react-table';
import ProductPreviewDrawer from '../products/ProductDrawer.component';
import { Product } from '../../api/products.api';

type TableProps<T extends object> = {
  columns: ReadonlyArray<Column<T>>;
  data: T[];
  isLoading: boolean;
  manualPagination: boolean;
};

function DataTable<T extends object>({
  columns,
  data,
  isLoading,
  manualPagination = false,
}: TableProps<T>) {
  const columnData = useMemo(() => columns, [columns]);
  const rowData = useMemo(() => data, [data]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: columnData,
      data: rowData,
    });
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>({
    name: '',
    instock: '',
    productId: '',
    brandName: '',
    stockCount: '',
    price: 0,
  });

  // const Td = ({ cell, children, className, minW }) => {
  //   return (
  //     <td
  //       {...cell.getCellProps()}
  //       className={className}
  //       style={{ minWidth: minW }}
  //     >
  //       {cell.column.id === 'selectColumn' ? (
  //         <select
  //           value={cell.value}
  //           onChange={(e) => cell.onChange(e.target.value)}
  //         >
  //           {/* Populate options based on your data or static options */}
  //           <option value="option1">Option 1</option>
  //           <option value="option2">Option 2</option>
  //           <option value="option3">Option 3</option>
  //         </select>
  //       ) : (
  //         children
  //       )}
  //     </td>
  //   );
  // };

  const handleRowClick = (productData: Product) => {
    setSelectedProduct(productData);
    console.log(selectedProduct);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
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
        border="1px"
        borderColor="teal.100"
        borderRadius={15}
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
                onClick={() => handleRowClick(row.original as Product)}
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
                    {cell.render('Cell')}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <ProductPreviewDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        productData={selectedProduct}
      />
    </div>
  );
}

export default DataTable;
