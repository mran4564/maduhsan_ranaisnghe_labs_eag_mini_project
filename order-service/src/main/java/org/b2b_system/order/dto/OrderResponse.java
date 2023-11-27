package org.b2b_system.order.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {
    private UUID customerId;
    private UUID orderId;
    private List<OrderItemResponse> orderItems;
    private BigDecimal totalPrice;
}
