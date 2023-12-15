package org.b2b_system.order.service;

import org.b2b_system.order.dto.CreateOrderRequest;
import org.b2b_system.order.dto.OrderResponse;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

public interface OrderService {

    @Transactional
    OrderResponse createCategory(CreateOrderRequest request);

    OrderResponse getOrderByOrderId(UUID id);

    List<OrderResponse> getOrders(UUID customerId);
}
