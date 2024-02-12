import { ORDER_API } from '../constants/api.constants';
import { OrderItemResponse } from './orderItem.type';

export interface CreateOrderRequest {
  customerId: string;
  orderItemRequests: OrderItemRequest[];
  deliveryAddress: string;
}

export interface OrderItemRequest {
  productId: string;
  supplierId?: string;
  unitPrice: number;
  quantity: number;
}

export interface OrderResponse {
  customerId: string;
  orderId: string;
  orderItems: OrderItemResponse[];
  totalPrice: number;
}

export interface UpdateOrderItemStatusRequestDto {
  orderItemStatus: string;
}

export enum OrderStatus {
  COMPLETE,
  PROCESSING,
  CANCELLED,
}

export const OrderApi = {
  createOrder: ORDER_API,
};
