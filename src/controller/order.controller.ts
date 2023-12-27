import { NextFunction, Request, Response } from 'express';
import { CreateOrderRequestDto, UpdateOrderItemStatusRequestDto } from '../model/order.model';

import OrderService from '../service/order.service';

const orderService = new OrderService();

class OrderController {
  async createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    const orderDTO: CreateOrderRequestDto = req.body;
    try {
      const data = await orderService.createOrder(orderDTO);
      res.status(201).json({ message: 'Order Created successfully', data });
    } catch (error: any) {
      next(error);
    }
  }

  async getOrdersByCustomer(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const content = await orderService.getOrdersByCustomer(req);
      res.status(200).json({ content });
    } catch (error) {
      next(error);
    }
  }

  async getOrderByOrderId(req: Request, res: Response, next: NextFunction): Promise<void> {
    const orderId: string = req.params.id;
    try {
      const order = await orderService.getOrdersByOrderId(orderId);
      if (order) {
        res.status(200).json(order);
      }
    } catch (error) {
      next(error);
    }
  }

  async getOrderItemsBySupplier(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const orderItems = await orderService.getOrderItemsBySupplier(req);
      if (orderItems) {
        res.status(200).json(orderItems);
      }
    } catch (error) {
      next(error);
    }
  }

  async updateOrderItem(req: Request, res: Response, next: NextFunction): Promise<void> {
    const updateOrderItemStatus: UpdateOrderItemStatusRequestDto = req.body;
    const orderId: string = req.params.id;
    try {
      const result = await orderService.updateOrderItemStatus(orderId, updateOrderItemStatus);
      if (result) {
        res.status(200).json({ message: 'Order Item updated successfully', result });
      } else {
        res.status(404).json({ message: 'Unsuccessfull operation' });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default OrderController;
