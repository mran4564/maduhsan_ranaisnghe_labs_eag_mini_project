import axios from 'axios';

import { Request } from 'express';
import config from '../config/config';
import {
  CreateOrderRequestDto,
  OrderItemResponseDto,
  OrderResponse,
  UpdateOrderItemStatusRequestDto,
} from '../model/order.model';
import { PageResponse } from '../model/product.model';
import CartService from './cart.service';

class OrderService {
  cartService = new CartService();

  async createOrder(createOrderRequestDto: CreateOrderRequestDto) {
    const response = await axios.post(config.orderApi, createOrderRequestDto);
    if (response.status === 200) {
      const response = await axios.delete(config.cartApi, {
        params: {
          customer_id: createOrderRequestDto.customerId,
        },
      });
    }
    return response.data;
  }

  async getOrdersByCustomer(req: Request) {
    const { customer_id } = req.query;
    const response = await axios.get(config.orderApi, {
      params: {
        customer_id: customer_id,
      },
    });
    return response.data;
  }

  async getOrdersByOrderId(orderId: string) {
    const response = await axios.get(config.orderApi + `/${orderId}`);
    return response.data;
  }
  async getOrderItemsBySupplier(req: Request) {
    const { supplier_id } = req.query;
    const response = await axios.get(config.orderItemApi, {
      params: {
        supplier_id,
      },
    });
    const responseData: PageResponse<OrderItemResponseDto> = {
      content: response.data.content,
      pageSize: response.data.size,
      currentPage: response.data.pageable.pageNumber,
      totalElements: response.data.totalElements,
      totalPages: response.data.totalPages,
    };
    return responseData;
  }

  async updateOrderItemStatus(orderItemId: string, updateOrderItemStatus: UpdateOrderItemStatusRequestDto) {
    const response = await axios.patch(config.cartApi + `/${orderItemId}`, updateOrderItemStatus);
    return response.data;
  }
}

export default OrderService;
