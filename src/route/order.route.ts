import { Router } from 'express';
import OrderController from '../controller/order.controller';

class OrderRoutes {
  private router: Router;
  private orderController: OrderController;

  constructor() {
    this.router = Router();
    this.orderController = new OrderController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('', this.orderController.createOrder.bind(this.orderController));
    this.router.put('', this.orderController.getOrdersByCustomer.bind(this.orderController));
    this.router.get('/:id', this.orderController.getOrderByOrderId.bind(this.orderController));
    this.router.get('/order-items', this.orderController.getOrderItemsBySupplier.bind(this.orderController));
    this.router.patch('/order-items/:id', this.orderController.updateOrderItem.bind(this.orderController));
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default OrderRoutes;
