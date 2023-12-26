import { CART_API } from '../constants/api.constants';

export type CartItemType = {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  imageUrl: string;
};

export interface CartResponse {
  cartId: string;
  customerId: string;
  cartItems: CartItemResponse[];
  total: number;
}

export interface CartItemResponse {
  cartItemId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export const CartApi = {
  GetCart: (customer_id: string) => CART_API + `?customer_id=${customer_id}`,
  AddItemToCart: (customer_id: string) =>
    CART_API + `?customer_id=${customer_id}`,
  UpdateCartItem: (cartItemId: string) => CART_API + `/${cartItemId}`,
  DeleteCartData: (customer_id: string) =>
    CART_API + `?customer_id=${customer_id}`,
};

export interface AddCartItemRequestDto {
  productId: string;
  unitPrice: number;
  quantity: number;
}

export interface updateCartItemRequestDto {
  unitPrice: number;
  quantity: number;
}
