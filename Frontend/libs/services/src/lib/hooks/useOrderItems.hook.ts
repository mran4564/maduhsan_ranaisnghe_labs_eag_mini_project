import { ORDER_ITEMS_API } from '../constants/api.constants';
import { OrderItemQuery, OrderItemResponse } from '../types/orderItem.type';
import { useData } from './useData.hook';

export const useOrderItems = (queryParams: OrderItemQuery) =>
  useData<OrderItemResponse>(
    ORDER_ITEMS_API,
    {
      params: queryParams,
    },
    []
  );

export const useOrderItemsSuppliers = (
  queryParams: OrderItemQuery,
  supplier_id: string
) =>
  useData<OrderItemResponse>(
    ORDER_ITEMS_API,
    {
      params: queryParams,
    },
    [supplier_id]
  );
