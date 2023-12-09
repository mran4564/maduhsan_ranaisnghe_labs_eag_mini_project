import { useEffect, useState } from 'react';
import {
  getData,
  formatRowData,
  columns,
  Product,
  ProductPage,
} from '../../api/products.api';
import DataTable from './Table.component';
import { Box } from '@chakra-ui/react';
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
      setLoading(false);
      setProductData(formatRowData(data));
      setCurrentPage(info.currentPage);
      setTotalPages(info.totalPages);
      setPageSize(info.pageSize);
    });
    setCurrentPage(page);
  };

  useEffect(() => {
    setLoading(true);
    getData(0).then((info: ProductPage) => {
      const data = info.content;
      setLoading(false);
      setProductData(formatRowData(data));
      setCurrentPage(info.currentPage);
      setTotalPages(info.totalPages);
      setPageSize(info.pageSize);
    });
  }, []);

  return (
    <Box width={'140%'} height={500} mt={8} ml={10}>
      <DataTable
        columns={columns}
        data={productData}
        isLoading={isLoading}
        manualPagination
      />
      <Pagination
        totalPages={totalPages}
        currentPageNo={currentPage}
        pageChangeHandler={handlePageChange}
        pageSize={pageSize}
      />
    </Box>
  );
};

export default ProductTable;
