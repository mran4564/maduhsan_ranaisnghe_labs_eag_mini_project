import { ORDER_API } from '../constants/api.constants';
import { OrderResponse } from '../types/order.type';
import { useData } from './useData.hook';

export const useOrdersCustomers = (customer_id: string) =>
  useData<OrderResponse>(
    ORDER_API,
    {
      params: {
        customer_id: customer_id,
      },
    },
    [customer_id]
  );
