package org.b2b_system.cart.service;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.b2b_system.cart.dto.cart.CartResponse;
import org.b2b_system.cart.dto.cart.CreateCartRequest;
import org.b2b_system.cart.dto.cartitem.AddCartItemRequest;
import org.b2b_system.cart.dto.cartitem.CartItemResponse;
import org.b2b_system.cart.dto.cartitem.UpdateCartItemRequest;
import org.b2b_system.cart.model.Cart;
import org.b2b_system.cart.model.CartItem;
import org.b2b_system.cart.repository.CartItemRepository;
import org.b2b_system.cart.repository.CartRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    private final CartItemRepository cartItemRepository;
    Logger logger = LoggerFactory.getLogger(CartServiceImpl.class);

    @Override
    public CartResponse createCart(CreateCartRequest request) {
        return mapCartToResponse(cartRepository.save(mapRequestToCart(request)));
    }

    @Override
    public CartResponse getCartByCartId(UUID cartId) {
        return cartRepository.findByCartId(cartId).map(this::mapCartToResponse)
                .orElseThrow(() -> new EntityNotFoundException("Cart with id %s does not exists".formatted(cartId)));

    }

    @Override
    public CartResponse getCartByCustomer(UUID customerId) {
        return cartRepository.findByCustomerId(customerId).map(this::mapCartToResponse)
                .orElseThrow(() -> new EntityNotFoundException("Cart with customer id %s does not exists".formatted(customerId)));
    }

    @Override
    public CartResponse updateCartItem(UUID cartItemId, UpdateCartItemRequest cartItemRequest) {
        BigDecimal cartItemNewTotalPrice = cartItemRequest.getUnitPrice()
                .multiply(BigDecimal.valueOf(cartItemRequest.getQuantity()));

        return cartItemRepository.findByCartItemId(cartItemId).map(
                        cartItem -> {
                            var cartItemPrevPrice = cartItem.getTotal();
                            cartItem.setTotal(cartItemNewTotalPrice);
                            cartItem.setQuantity(cartItemRequest.getQuantity());
                            var updatedCartItem = cartItemRepository.save(cartItem);
                            logger.info("Cart updated Successfully");
                            return cartRepository.findByCartId(updatedCartItem.getCart().getCartId()).map(
                                    cart -> {
                                        cart.updateTotal(cartItemNewTotalPrice,cartItemPrevPrice);
                                        return mapCartToResponse(cartRepository.save(cart));
                                    }
                            ).orElseThrow(() -> new EntityNotFoundException("Cart with  id %s does not exists"
                                    .formatted(updatedCartItem.getCart().getCartId())));
                        })
                .orElseThrow(() -> new EntityNotFoundException("CartItem with  id %s does not exists"
                        .formatted(cartItemId)));
    }

    @Override
    public CartResponse removeCartItem(UUID cartItemId) {
        return cartItemRepository.findByCartItemId(cartItemId).map(cartItem -> {
                    cartItemRepository.delete(cartItem);
                    return cartRepository.findByCartId(cartItem.getCart().getCartId()).map(
                            cart -> {
                                cart.reduceTotal(cartItem.getTotal());
                                var updatedCart = cartRepository.save(cart);
                                return mapCartToResponse(updatedCart);
                            }
                    ).orElseThrow(() -> new EntityNotFoundException("Cart with  id %s does not exists"
                            .formatted(cartItem.getCart().getCartId())));
                })

                .orElseThrow(() -> new EntityNotFoundException("CartItem with  id %s does not exists"
                        .formatted(cartItemId)));
    }

    @Override
    public CartResponse restCart(UUID customerId) {
        return cartRepository.findByCustomerId(customerId).map(cart -> {
                    cart.getCartItems().clear();
                    cart.setTotal(new BigDecimal(0));
                    cartRepository.save(cart);
                    return mapCartToResponse(cartRepository.getReferenceById(cart.getId()));
                })
                .orElseThrow(() -> new EntityNotFoundException("Cart with customer id %s does not exists".formatted(customerId)));
    }

    @Override
    public CartResponse addCartItem(UUID customerId, AddCartItemRequest request) {
        return cartRepository.findByCustomerId(customerId).map(cart -> {
                    var cartItemIsExists =
                            cart.getCartItems().stream().anyMatch(cartItem -> cartItem.getProductId().equals(request.getProductId()));
                    if (cartItemIsExists) {
                        throw new EntityExistsException("Product  is already in the cart");
                    }
                    cart.addCartItems(mapRequestToCartItem(request, cart));
                    var updatedCart = cartRepository.save(cart);
                    return mapCartToResponse(updatedCart);
                })
                .orElseThrow(() -> new EntityNotFoundException("Cart with customer id %s does not exists".formatted(customerId)));
    }

    private Cart mapRequestToCart(CreateCartRequest request) {
        return Cart.builder()
                .cartId(UUID.randomUUID())
                .customerId(request.getCustomerId())
                .build();
    }

    private CartResponse mapCartToResponse(Cart cart) {
        return CartResponse.builder()
                .cartId(cart.getCartId())
                .customerId(cart.getCustomerId())
                .cartItems(cart.getCartItems().stream().map(this::mapCartItemToResponse).toList())
                .total(cart.getTotal())
                .build();
    }

    private CartItemResponse mapCartItemToResponse(CartItem cartItem) {
        return CartItemResponse.builder()
                .cartItemId(cartItem.getCartItemId())
                .productId(cartItem.getProductId())
                .unitPrice(cartItem.getUnitPrice())
                .quantity(cartItem.getQuantity())
                .total(cartItem.getTotal())
                .build();
    }

    private CartItem mapRequestToCartItem(AddCartItemRequest cartItemRequest, Cart cart) {
        BigDecimal cartItemTotalPrice = cartItemRequest.getUnitPrice()
                .multiply(BigDecimal.valueOf(cartItemRequest.getQuantity()));
        return CartItem.builder()
                .cart(cart)
                .cartItemId(UUID.randomUUID())
                .productId(cartItemRequest.getProductId())
                .total(cartItemTotalPrice)
                .unitPrice(cartItemRequest.getUnitPrice())
                .quantity(cartItemRequest.getQuantity())
                .build();
    }
}
