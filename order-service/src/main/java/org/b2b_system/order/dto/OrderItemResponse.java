package org.b2b_system.order.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.b2b_system.order.model.OrderItemStatus;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemResponse {
    private UUID subOrderId;
    private UUID productId;
    private UUID orderId;
    private OrderItemStatus status;
    private int quantity;
    private BigDecimal total;
}
