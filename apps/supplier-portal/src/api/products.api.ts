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
}

export type Product = {
  name: string;
  brandName: string;
  stockCount: string;
  instock: string;
  productId?: string;
  price: number;
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
];

export const formatRowData = (rawData: ProductResponse[]) =>
  rawData.map((info) => ({
    name: info.name,
    productId: info.productId,
    stockCount: info.stockCount,
    instock: info.inStock ? 'available' : 'not available',
    brandName: info.brandName,
    price: info.price,
  }));

export const getData = async (pageNo = 1) => {
  const response = await fetch(
    `http://localhost:8626/api/products?page=0&size=15`
  );
  const data: ProductResponse[] = await response.json();
  return data;
};
