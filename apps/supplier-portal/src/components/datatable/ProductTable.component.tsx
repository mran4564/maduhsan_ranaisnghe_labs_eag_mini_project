import { useEffect, useState } from 'react';
import {
  getData,
  formatRowData,
  columns,
  Product,
  ProductPage,
} from '../../api/products.api';
import DataTable from './Table.component';
import { Box, Input, Select } from '@chakra-ui/react';
import Pagination from './pagination';

const ProductTable = () => {
  const [productData, setProductData] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const handlePageChange = (page: number) => {
    console.log(page);
    setLoading(true);
    getData(page).then((info: ProductPage) => {
      const data = info.content;
      setProductData(formatRowData(data));
      setCurrentPage(info.currentPage);
      setTotalPages(info.totalPages);
      setPageSize(info.pageSize);
    });
    setCurrentPage(page);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    setLoading(true);
    getData(0).then((info: ProductPage) => {
      const data = info.content;
      setProductData(formatRowData(data));
      setCurrentPage(info.currentPage);
      setTotalPages(info.totalPages);
      setPageSize(info.pageSize);
    });
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <Box width={'100%'} height={500} mt={5} ml={10}>
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
        data={productData}
        isLoading={isLoading}
        manualPagination
      />
      <Box position="fixed" bottom="5">
        <Pagination
          totalPages={totalPages}
          currentPageNo={currentPage}
          pageChangeHandler={handlePageChange}
          pageSize={pageSize}
        />
      </Box>
    </Box>
  );
};

export default ProductTable;
