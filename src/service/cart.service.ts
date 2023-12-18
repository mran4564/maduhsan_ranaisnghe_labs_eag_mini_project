import axios from 'axios';

import { Request } from 'express';
import config from '../config/config';
import { AddCartItemRequestDto, CreateCartRequestDto, updateCartItemRequestDto } from '../model/cart.model';

class CartService {
  async createCart(createCartDTO: CreateCartRequestDto) {
    const response = await axios.post(config.cartApi, createCartDTO);
    return response;
  }
  async getCartByCustomer(req: Request) {
    const { customer_id } = req.query;
    const response = await axios.get(config.cartApi, {
      params: {
        customer_id,
      },
    });

    return response.data;
  }

  async getCartById(cartId: string) {
    const response = await axios.get(config.cartApi + `/${cartId}`);
    return response.data;
  }

  async addCartItem(req: Request, addCartItemReqeust: AddCartItemRequestDto) {
    const { customer_id } = req.query;
    const response = await axios.put(config.cartApi, addCartItemReqeust, {
      params: {
        customer_id,
      },
    });
    return response.data;
  }

  async updateCartItem(req: Request, cartItemId: string, updateCartItemRequest: updateCartItemRequestDto) {
    const { customer_id } = req.query;
    const response = await axios.patch(config.cartApi + `/${cartItemId}`, updateCartItemRequest, {
      params: {
        customer_id,
      },
    });
    return response.data;
  }

  async removeCartItem(cartItemId: string) {
    const response = await axios.delete(config.cartApi + `/${cartItemId}`);
    return response.data;
  }

  async resetCart(req: Request) {
    const { customer_id } = req.query;
    const result = await axios.delete(config.cartApi, {
      params: {
        customer_id,
      },
    });
    return result.data;
  }
}

export default CartService;
