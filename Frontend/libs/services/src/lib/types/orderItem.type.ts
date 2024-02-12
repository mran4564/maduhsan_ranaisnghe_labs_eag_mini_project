import { Column } from 'react-table';
import { ORDER_ITEMS_API } from '../constants/api.constants';

export interface OrderItemQuery {
  page?: number;
  size?: number;
  supplier_id: string;
}

export const OrderItemStatus = {
  CONFIRMED: 'CONFIRMED',
  UNCONFIRMED: 'UNCONFIRMED',
  REJECTED: 'REJECTED',
  COMPLETE: 'COMPLETE',
};

export interface UpdateOrderItemStatusRequest {
  orderItemStatus: string;
}

export interface OrderItemResponse {
  orderItemId: string;
  productId: string;
  supplierId: string;
  status: string;
  quantity: number;
  total: number;
}

export const OrderItemApi = {
  updateOrderItem: (orderItemId: string) => ORDER_ITEMS_API + `/${orderItemId}`,
};

export const orderItemColumns: ReadonlyArray<Column<OrderItemResponse>> = [
  {
    Header: 'OrderItem Id',
    accessor: 'orderItemId',
  },
  {
    Header: 'Product',
    accessor: 'productId',
  },
  {
    Header: 'Supplier',
    accessor: 'supplierId',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Quantity',
    accessor: 'quantity',
  },
  {
    Header: 'Total Price',
    accessor: 'total',
  },
];

export const columnMapOrderItems = {
  orderItemId: 'OrderItem Id',
  productId: 'Product',
  supplierId: 'Supplier',
  status: 'Status',
  quantity: 'Quantity',
  total: 'Total Price',
};
