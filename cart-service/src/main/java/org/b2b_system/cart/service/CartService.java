package org.b2b_system.cart.service;

import org.b2b_system.cart.dto.cart.CreateCartRequest;
import org.b2b_system.cart.dto.cart.CartResponse;
import org.b2b_system.cart.dto.cartitem.AddCartItemRequest;
import org.b2b_system.cart.dto.cartitem.UpdateCartItemRequest;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

public interface CartService {

    @Transactional
    CartResponse createCart(CreateCartRequest request);

    CartResponse getCartByCartId(UUID id);

    CartResponse getCartByCustomer(UUID customerId);

    CartResponse updateCartItem(UUID customerId, UpdateCartItemRequest cartItemRequest);

    CartResponse removeCartItem(UUID cartItemId);

    CartResponse restCart(UUID customerId);

    CartResponse addCartItem(UUID customerId, AddCartItemRequest request);
}
