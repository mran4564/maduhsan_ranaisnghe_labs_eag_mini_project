package org.b2b_system.order.dto.orderitem;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.b2b_system.order.model.OrderItemStatus;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateOrderItemStatusRequest {
    private OrderItemStatus orderItemStatus;
}
