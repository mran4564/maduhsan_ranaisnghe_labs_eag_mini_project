package org.b2b_system.cart.dto.cartitem;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartItemResponse {
    private UUID cartItemId;
    private UUID productId;
    private int quantity;
    private BigDecimal total;
}
