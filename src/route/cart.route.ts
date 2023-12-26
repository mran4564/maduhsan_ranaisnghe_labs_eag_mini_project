import { Router } from 'express';
import CartController from '../controller/cart.controller';
import { Roles, authorize } from '../middleware/auth.validator.cognito';

class CartRoutes {
  private router: Router;
  private cartController: CartController;

  constructor() {
    this.router = Router();
    this.cartController = new CartController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('', authorize(Roles.Customer), this.cartController.getCart.bind(this.cartController));
    this.router.put('', authorize(Roles.Customer), this.cartController.addCartItem.bind(this.cartController));
    this.router.delete('', authorize(Roles.Customer), this.cartController.resetCart.bind(this.cartController));
    this.router.get('/:id', authorize(Roles.Customer), this.cartController.getCartById.bind(this.cartController));
    this.router.delete('/:id', authorize(Roles.Customer), this.cartController.removeCartItem.bind(this.cartController));
    this.router.patch('/:id', authorize(Roles.Customer), this.cartController.updteCartItem.bind(this.cartController));
    this.router.delete('/:id', authorize(Roles.Customer), this.cartController.removeCartItem.bind(this.cartController));
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default CartRoutes;
