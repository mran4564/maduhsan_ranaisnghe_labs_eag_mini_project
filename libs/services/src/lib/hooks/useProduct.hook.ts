import { PRODUCTS_API } from '../constants/api.constants';
import { ProductQuery, ProductResponse } from '../types/products.type';
import { useData } from './useData.hook';

export const useProducts = (queryParams: ProductQuery) =>
  useData<ProductResponse>(
    PRODUCTS_API,
    {
      params: queryParams,
    },
    []
  );

export const useProductsCustomers = (
  queryParams: ProductQuery,
  category_id: string
) =>
  useData<ProductResponse>(
    PRODUCTS_API,
    {
      params: queryParams,
    },
    [category_id]
  );
