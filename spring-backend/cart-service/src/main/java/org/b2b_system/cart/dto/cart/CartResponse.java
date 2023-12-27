package org.b2b_system.cart.dto.cart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.b2b_system.cart.dto.cartitem.CartItemResponse;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartResponse {
    private UUID cartId;
    private UUID customerId;
    private List<CartItemResponse> cartItems;
    private BigDecimal total;
}
