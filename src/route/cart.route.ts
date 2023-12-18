import { Router } from 'express';
import CartController from '../controller/cart.controller';

class CartRoutes {
  private router: Router;
  private cartController: CartController;

  constructor() {
    this.router = Router();
    this.cartController = new CartController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('', this.cartController.getCart.bind(this.cartController));
    this.router.put('', this.cartController.addCartItem.bind(this.cartController));
    this.router.delete('', this.cartController.resetCart.bind(this.cartController));
    this.router.get('/:id', this.cartController.getCartById.bind(this.cartController));
    this.router.delete('/:id', this.cartController.removeCartItem.bind(this.cartController));
    this.router.patch('/:id', this.cartController.updteCartItem.bind(this.cartController));
    this.router.delete('/:id', this.cartController.removeCartItem.bind(this.cartController));
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default CartRoutes;
