import { useState } from 'react';
import { Box, Input, Select } from '@chakra-ui/react';
import {
  loadSession,
  orderItemColumns,
  OrderItemResponse,
  OrderItemStatus,
  useOrderItemsSuppliers,
} from '@b2b-app-mfe/services';
import { Pagination } from '@b2b-app-mfe/common-components';
import DataTable from './Table.component';
import OrderItemDrawer from './OrderItemDrawer.component';

export type OrderItemTableProps = {
  status?: string;
};

const OrderItemTable = ({ status }: OrderItemTableProps) => {
  const [pageSize, setPageSize] = useState(10);
  const { userId } = loadSession();
  const { data, pageData, isLoading, handlePagination } =
    useOrderItemsSuppliers(
      {
        page: 0,
        supplier_id: userId,
      },
      userId
    );

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState<OrderItemResponse>(
    {
      orderItemId: '',
      productId: '',
      supplierId: '',
      status: OrderItemStatus.UNCONFIRMED,
      quantity: 0,
      total: 0,
    }
  );

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const setDrawerOrderItem = <T extends object>(item: T) => {
    setSelectedOrderItem(item as OrderItemResponse);
  };

  const handlePageChange = (page: number) => {
    if (status) {
      handlePagination(page, '');
    }
  };

  return (
    <Box border={2} width={'100%'} height={500} mt={5} ml={10}>
      <Box mb="3" display="flex" justifyContent="space-between">
        <Box />
        <Box display="flex" justifyContent="space-between">
          <Input
            mr={5}
            borderRadius={6}
            size={'sm'}
            placeholder="Search"
            maxW="250px"
          />
          <Select
            size={'sm'}
            onChange={(e) => {
              setPageSize(+e.target.value);
            }}
          >
            <option value="all">Any</option>
            <option value="category">Category</option>
            <option value="brand_name">Brand Name</option>
          </Select>
        </Box>
      </Box>
      <DataTable<OrderItemResponse>
        columns={orderItemColumns}
        data={data}
        isLoading={isLoading}
        manualPagination
        openDrawer={openDrawer}
        setSelectItem={setDrawerOrderItem}
      />
      <OrderItemDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        setData={() => handlePageChange(0)}
        orderItemData={selectedOrderItem}
      />
      <Box position="fixed" bottom="5">
        <Pagination
          totalPages={pageData.totalPages}
          currentPageNo={pageData.currentPage}
          pageChangeHandler={handlePageChange}
          pageSize={pageSize}
        />
      </Box>
    </Box>
  );
};

export default OrderItemTable;
