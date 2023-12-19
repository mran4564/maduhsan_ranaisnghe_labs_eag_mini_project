import axios from 'axios';

import { Request } from 'express';
import config from '../config/config';
import { CreateOrderRequestDto, UpdateOrderItemStatusRequestDto } from '../model/order.model';

class OrderService {
  async createOrder(createOrderRequestDto: CreateOrderRequestDto) {
    const response = await axios.post(config.orderApi, createOrderRequestDto);
    return response.data;
  }

  async getOrdersByCustomer(req: Request) {
    const { customer_id } = req.params;
    const response = await axios.get(config.orderApi, {
      params: {
        customer_id,
      },
    });

    return response.data;
  }

  async getOrdersByOrderId(orderId: string) {
    const response = await axios.get(config.orderApi + `/${orderId}`);
    return response.data;
  }
  async getOrderItemsBySupplier(req: Request) {
    const { supplier_id } = req.params;
    const response = await axios.get(config.orderItemApi, {
      params: {
        supplier_id,
      },
    });

    return response.data;
  }

  async updateOrderItemStatus(orderItemId: string, updateOrderItemStatus: UpdateOrderItemStatusRequestDto) {
    const response = await axios.patch(config.cartApi + `/${orderItemId}`, updateOrderItemStatus);
    return response.data;
  }
}

export default OrderService;
