package org.b2b_system.order.mapper;

import org.b2b_system.order.dto.orderitem.CreateOrderItemRequest;
import org.b2b_system.order.dto.orderitem.OrderItemResponse;
import org.b2b_system.order.model.Order;
import org.b2b_system.order.model.OrderItem;
import org.b2b_system.order.model.OrderItemStatus;

import java.math.BigDecimal;
import java.util.UUID;

public class OrderItemMapper {

    private OrderItemMapper() {
    }

    public static OrderItem mapRequestToOrderItem(CreateOrderItemRequest request, Order order) {
        BigDecimal subOrderTotalPrice = request.getUnitPrice()
                .multiply(BigDecimal.valueOf(request.getQuantity()));
        return OrderItem.builder()
                .productId(request.getProductId())
                .order(order)
                .supplierId(request.getSupplierId())
                .orderItemId(UUID.randomUUID())
                .status(OrderItemStatus.UNCONFIRMED)
                .quantity(request.getQuantity())
                .total(subOrderTotalPrice)
                .build();

    }

    public static OrderItemResponse mapOrderItemToResponse(OrderItem orderItem) {
        return OrderItemResponse.builder()
                .orderItemId(orderItem.getOrderItemId())
                .supplierId(orderItem.getSupplierId())
                .productId(orderItem.getProductId())
                .quantity(orderItem.getQuantity())
                .status(orderItem.getStatus())
                .total(orderItem.getTotal())
                .build();
    }
}
