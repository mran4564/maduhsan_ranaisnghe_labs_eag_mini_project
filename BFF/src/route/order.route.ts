import { Router } from 'express';
import OrderController from '../controller/order.controller';
import { Roles, authorize } from '../middleware/auth.validator.cognito';

class OrderRoutes {
  private router: Router;
  private orderController: OrderController;

  constructor() {
    this.router = Router();
    this.orderController = new OrderController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('', authorize(Roles.Customer), this.orderController.createOrder.bind(this.orderController));
    this.router.get('', authorize(Roles.Customer), this.orderController.getOrdersByCustomer.bind(this.orderController));
    this.router.get('/:id', authorize(Roles.All), this.orderController.getOrderByOrderId.bind(this.orderController));
    this.router.get(
      '/order-items',
      authorize(Roles.Supplier),
      this.orderController.getOrderItemsBySupplier.bind(this.orderController),
    );
    this.router.patch(
      '/order-items/:id',
      authorize(Roles.Supplier),
      this.orderController.updateOrderItem.bind(this.orderController),
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default OrderRoutes;
