import { useState } from 'react';

import DataTable from './Table.component';
import { Box, Input, Select } from '@chakra-ui/react';
import { Pagination } from './Pagination.component';
import { columns, ProductResponse, useProducts } from '@b2b-app-mfe/services';
import ProductPreviewDrawer from '../products/ProductDrawer.component';

export type ProductTableProps = {
  status?: string;
};

const ProductTable = ({ status }: ProductTableProps) => {
  const [pageSize, setPageSize] = useState(10);
  const { data, pageData, isLoading, handlePagination } = useProducts({
    page: 0,
    status: status,
  });

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductResponse>({
    name: '',
    productId: '',
    brandName: '',
    stockCount: '',
    price: 0,
  });

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const setDrawerProduct = <T extends object>(item: T) => {
    setSelectedProduct(item as ProductResponse);
  };

  const handlePageChange = (page: number) => {
    handlePagination(page, status ?? '');
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
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        manualPagination
        openDrawer={openDrawer}
        setSelectItem={setDrawerProduct}
      />
      <Box position="fixed" bottom="5">
        <Pagination
          totalPages={pageData.totalPages}
          currentPageNo={pageData.currentPage}
          pageChangeHandler={handlePageChange}
          pageSize={pageSize}
        />
      </Box>
      <ProductPreviewDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        setData={() => handlePageChange(0)}
        productData={selectedProduct}
      />
    </Box>
  );
};

export default ProductTable;
