package org.b2b_system.order.mapper;

import org.b2b_system.order.dto.order.CreateOrderRequest;
import org.b2b_system.order.dto.order.OrderResponse;
import org.b2b_system.order.model.Order;

import java.util.UUID;

public class OrderMapper {

    private OrderMapper() {
    }

    public static Order mapRequestToOrder(CreateOrderRequest request) {
        return Order.builder()
                .orderId(UUID.randomUUID())
                .customerId(request.getCustomerId())
                .deliveryAddress(request.getDeliveryAddress())
                .build();
    }

    public static OrderResponse mapOrderToResponse(Order order) {
        return OrderResponse.builder()
                .orderId(order.getOrderId())
                .customerId(order.getCustomerId())
                .orderItems(order.getOrderItems().stream().map(OrderItemMapper::mapOrderItemToResponse).toList())
                .totalPrice(order.getTotal())
                .build();
    }
}
