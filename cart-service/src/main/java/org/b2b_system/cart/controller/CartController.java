package org.b2b_system.cart.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.b2b_system.cart.dto.cart.CreateCartRequest;
import org.b2b_system.cart.dto.cart.CartResponse;
import org.b2b_system.cart.dto.cartitem.AddCartItemRequest;
import org.b2b_system.cart.dto.cartitem.UpdateCartItemRequest;
import org.b2b_system.cart.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/carts")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping
    public ResponseEntity<CartResponse> createCart(
            @RequestBody @Valid CreateCartRequest request
    ) {
        return ResponseEntity.ok(cartService.createCart(request));
    }
    @GetMapping
    public ResponseEntity<CartResponse> getCartByCustomer(@RequestParam(name = "customer_id") UUID customerId) {
        return ResponseEntity.ok(cartService.getCartByCustomer(customerId));
    }
    @GetMapping("/{cartId}")
    public ResponseEntity<CartResponse> getCartByCartId(@PathVariable("cartId") UUID cartId) {
        return ResponseEntity.ok(cartService.getCartByCartId(cartId));
    }

    @DeleteMapping
    public ResponseEntity<CartResponse> resetCart(@RequestParam("customer_id") UUID customerId) {
        return ResponseEntity.ok(cartService.restCart(customerId));
    }

    @PutMapping
    public ResponseEntity<CartResponse> addCartItem(@RequestParam(name = "customer_id") UUID customerId,
                                                    @RequestBody @Valid AddCartItemRequest request) {
        return ResponseEntity.ok(cartService.addCartItem(customerId,request));
    }

    @PatchMapping("/{cartItemId}")
    public ResponseEntity<CartResponse> updateCartItem(@PathVariable("cartItemId") UUID cartItemId,
                                                       @RequestBody @Valid UpdateCartItemRequest request) {
        return ResponseEntity.ok(cartService.updateCartItem(cartItemId,request));
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<CartResponse> deleteCartItem(@PathVariable("cartItemId") UUID cartItemId) {
        return ResponseEntity.ok(cartService.removeCartItem(cartItemId));
    }


}
