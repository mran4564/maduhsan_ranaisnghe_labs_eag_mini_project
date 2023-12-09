import { Column } from 'react-table';

export interface ProductResponse {
  productId: string;
  name: string;
  description: string;
  supplierId: string;
  categoryId: string;
  stockCount: string;
  imageUrl: string;
  brandName: string;
  inStock: boolean;
  price: number;
  isApproved?: string;
}

export const ProductApproveStatusEnum = {
  APPROVED: 'APPROVED',
  PENDING: 'PENDING',
  REJECTED: 'REJECTED',
};

export type Product = {
  name: string;
  brandName: string;
  stockCount: string;
  instock: string;
  productId?: string;
  isApproved?: string;
  price: number;
};

export type ProductPage = {
  content: ProductResponse[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalElements: number;
};

export const columns: ReadonlyArray<Column<Product>> = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Brand Name',
    accessor: 'brandName',
  },
  {
    Header: 'Stock',
    accessor: 'stockCount',
  },
  {
    Header: 'Price',
    accessor: 'price',
  },
  {
    Header: 'Availability',
    accessor: 'instock',
  },
  {
    Header: 'Approved Status',
    accessor: 'isApproved',
  },
];

export const formatRowData = (rawData: ProductResponse[]) =>
  rawData.map((info) => ({
    name: info.name,
    productId: info.productId,
    stockCount: info.stockCount,
    instock: info.inStock ? 'Avaiable' : 'not available',
    brandName: info.brandName,
    isApproved: info.isApproved,
    price: info.price,
  }));

export const getData = async (pageNo = 0) => {
  const response = await fetch(
    `http://localhost:8626/api/products?page=${pageNo}&size=10`
  );

  const data: ProductPage = await response.json();
  return data;
};
