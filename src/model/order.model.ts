export interface CreateOrderRequestDto {
  customerId: string;
  orderItemRequests: CreateOrderItemRequestDto[];
  deliveryAddress: string;
}

export interface CreateOrderItemRequestDto {
  productId: string;
  supplierId: string;
  unitPrice: string;
  quantity: string;
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
