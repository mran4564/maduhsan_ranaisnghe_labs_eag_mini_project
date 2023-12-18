import { NextFunction, Request, Response } from 'express';
import { updateCartItemRequestDto } from '../model/cart.model';
import { AddCartItemRequestDto } from '../model/order.model';
import CartService from '../service/cart.service';

const cartService = new CartService();

class CartController {
  async getCart(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await cartService.getCartByCustomer(req);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getCartById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const cartId: string = req.params.id;
    try {
      const product = await cartService.getCartById(cartId);
      if (product) {
        res.status(200).json(product);
      }
    } catch (error) {
      next(error);
    }
  }

  async addCartItem(req: Request, res: Response, next: NextFunction): Promise<void> {
    const cartItemDTO: AddCartItemRequestDto = req.body;
    try {
      const data = await cartService.addCartItem(req, cartItemDTO);
      if (data) {
        res.status(200).json({ message: 'Item Added to the cart successfully', data });
      } else {
        res.status(404).json({ message: 'Unsuccessfull operation' });
      }
    } catch (error) {
      next(error);
    }
  }

  async updteCartItem(req: Request, res: Response, next: NextFunction): Promise<void> {
    const updateCartItemRequest: updateCartItemRequestDto = req.body;
    const cartItemId: string = req.params.id;
    try {
      const data = await cartService.updateCartItem(req, cartItemId, updateCartItemRequest);
      if (data) {
        res.status(200).json({ message: 'Cart Item updated successfully', data });
      } else {
        res.status(404).json({ message: 'Unsuccessfull operation' });
      }
    } catch (error) {
      next(error);
    }
  }

  async removeCartItem(req: Request, res: Response, next: NextFunction): Promise<void> {
    const cartItemId: string = req.params.id;
    try {
      const data = await cartService.removeCartItem(cartItemId);
      if (data) {
        res.status(200).json({ message: 'Cart ITem deleted successfully', data });
      } else {
        res.status(404).json({ message: 'cart item not found' });
      }
    } catch (error) {
      next(error);
    }
  }

  async resetCart(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await cartService.resetCart(req);
      if (data) {
        res.status(200).json({ message: 'Cart Updated', data });
      } else {
        res.status(404).json({ message: 'Unsuccessfull operation' });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default CartController;
