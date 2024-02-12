import { Column } from 'react-table';
import { PRODUCTS_API } from '../constants/api.constants';

export interface ProductResponse {
  productId: string;
  name: string;
  description?: string;
  supplierId?: string;
  categoryId?: string;
  stockCount: string;
  imageUrl?: string;
  brandName?: string;
  inStock?: boolean;
  price: number;
  isApproved?: string;
}
export interface ProductCreateDTO {
  name: string;
  description: string;
  supplierId: string;
  categoryId: string;
  stockCount: number;
  imageUrl: string;
  brandName?: string;
  instock?: boolean;
  price: number;
  isApproved?: boolean;
}

export interface ProductUpdateDTO {
  name?: string;
  description?: string;
  stockCount?: string;
  imageUrl: string;
  price?: number;
  inStock: true;
}

export const ProductApproveStatusEnum = {
  APPROVED: 'APPROVED',
  PENDING: 'PENDING',
  REJECTED: 'REJECTED',
};

export interface ProductQuery {
  page: number;
  size?: number;
  category_id?: string;
  brand_name?: string;
  in_stock?: boolean;
  status?: string;
}

export type ProductPage = {
  content: ProductResponse[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalElements: number;
};

export type ApproveProductRequest = {
  approved: string;
};

export const columns: ReadonlyArray<Column<ProductResponse>> = [
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
    accessor: 'inStock',
  },
  {
    Header: 'Status',
    accessor: 'isApproved',
  },
];

export const formatRowData = (rawData: ProductResponse[]) =>
  rawData.map((info) => ({
    name: info.name,
    productId: info.productId,
    stockCount: info.stockCount,
    imageUrl: info.imageUrl,
    inStock: info.inStock ? 'Avaiable' : 'not available',
    brandName: info.brandName,
    isApproved: info.isApproved,
    price: info.price,
  }));

export const ProductApi = {
  createProduct: PRODUCTS_API,
  uploadImage: PRODUCTS_API + '/upload',
  approveProduct: (productId: string) => PRODUCTS_API + `/${productId}`,
  getProducts: PRODUCTS_API,
  getProductById: (productId: string) => PRODUCTS_API + `/${productId}`,
  updateProduct: (productId: string) => PRODUCTS_API + `/${productId}`,
};

export const columnMap = {
  Name: 'Name',
  BrandName: 'Brand Name',
  Stock: 'Stock',
  Price: 'Price',
  Availabilty: 'Availability',
  ApproveStatus: 'Status',
};
