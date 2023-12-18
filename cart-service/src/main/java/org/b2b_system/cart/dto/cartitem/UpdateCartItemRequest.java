package org.b2b_system.cart.dto.cartitem;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateCartItemRequest {
    private BigDecimal unitPrice;
    private int quantity;
}
