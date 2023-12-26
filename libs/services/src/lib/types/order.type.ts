import { ORDER_API } from '../constants/api.constants';

export interface CreateOrderRequest {
  customerId: string;
  orderItemRequests: OrderItemRequest[];
  deliveryAddress: string;
}

export interface OrderItemRequest {
  productId: string;
  supplierId: string;
  unitPrice: number;
  quantity: number;
}

export interface OrderResponse {
  customerId: string;
  orderId: string;
  orderItems: OrderItemResponseDto[];
  totalPrice: number;
}

export interface OrderItemResponseDto {
  orderItemId: string;
  productId: string;
  supplierId: string;
  status: OrderItemStatus;
  quantity: number;
  total: number;
}

export interface UpdateOrderItemStatusRequestDto {
  orderItemStatus: OrderItemStatus;
}

export enum OrderItemStatus {
  CONFIRMED,
  UNCONFIRMED,
  REJECTED,
  COMPLETE,
}

export enum OrderStatus {
  COMPLETE,
  PROCESSING,
  CANCELLED,
}

export const OrderApi = {
  createOrder: ORDER_API,
};
