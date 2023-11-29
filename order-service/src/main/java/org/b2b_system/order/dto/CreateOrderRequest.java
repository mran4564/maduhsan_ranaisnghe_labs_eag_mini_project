package org.b2b_system.order.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateOrderRequest {
    private UUID customerId;
    private List<CreateOrderItemRequest> orderItemRequests;
    private String deliveryAddress;
}
