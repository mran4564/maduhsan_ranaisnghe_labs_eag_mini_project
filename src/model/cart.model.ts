export interface CreateCartRequestDto {
  customerId: string;
}

export interface CartResponseDTO {
  cartId: string;
  customerId: string;
  cartItems: CartItemResponseDto;
  total: number;
}

export interface CartItemResponseDto {
  cartItemId: string;
  productId: string;
  quantity: number;
  total: number;
}

export interface AddCartItemRequestDto {
  productId: string;
  unitPrice: number;
  quantity: number;
}

export interface updateCartItemRequestDto {
  unitPrice: number;
  quantity: number;
}
