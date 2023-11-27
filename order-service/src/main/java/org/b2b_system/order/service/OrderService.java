package org.b2b_system.order.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.b2b_system.order.dto.CreateOrderItemRequest;
import org.b2b_system.order.dto.CreateOrderRequest;
import org.b2b_system.order.dto.OrderResponse;
import org.b2b_system.order.dto.OrderItemResponse;
import org.b2b_system.order.model.Order;
import org.b2b_system.order.model.OrderItem;
import org.b2b_system.order.model.OrderItemStatus;
import org.b2b_system.order.repository.OrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    Logger logger = LoggerFactory.getLogger(OrderService.class);

    @Transactional
    public OrderResponse createCategory(CreateOrderRequest request) {
        var order = mapRequestToOrder(request);

        List<OrderItem> orderItems = request.getOrderItemRequests().stream()
                .map(createOrderItemRequest -> mapRequestToOrderItem(createOrderItemRequest, order))
                .peek(orderItem -> order.updateTotal(orderItem.getTotal()))
                .toList();

        order.addOrderItems(orderItems);
        var savedOrder = orderRepository.save(order);
        logger.info("Order saved successfully");

        return mapOrderToResponse(savedOrder);
    }

    private Order mapRequestToOrder(CreateOrderRequest request) {
        return Order.builder()
                .orderId(UUID.randomUUID())
                .customerId(request.getCustomerId())
                .deliveryAddress(request.getDeliveryAddress())
                .build();
    }

    private OrderItem mapRequestToOrderItem(CreateOrderItemRequest request, Order order) {
        BigDecimal subOrderTotalPrice = request.getPrice()
                .multiply(BigDecimal.valueOf(request.getQuantity()));
        return OrderItem.builder()
                .productId(request.getProductId())
                .order(order)
                .orderItemId(UUID.randomUUID())
                .status(OrderItemStatus.UNCONFIRMED)
                .quantity(request.getQuantity())
                .total(subOrderTotalPrice)
                .build();

    }

    private OrderItemResponse mapOrderItemToResponse(OrderItem orderItem) {
        return OrderItemResponse.builder()
                .subOrderId(orderItem.getOrderItemId())
                .productId(orderItem.getProductId())
                .orderId(orderItem.getOrder().getOrderId())
                .quantity(orderItem.getQuantity())
                .total(orderItem.getTotal())
                .build();
    }

    private OrderResponse mapOrderToResponse(Order order) {
        return OrderResponse.builder()
                .orderId(order.getOrderId())
                .customerId(order.getCustomerId())
                .orderItems(order.getOrderItems().stream().map(this::mapOrderItemToResponse).toList())
                .totalPrice(order.getTotal())
                .build();
    }

    public OrderResponse getOrderByOrderId(UUID id) {
        return orderRepository.findByOrderId(id).map(this::mapOrderToResponse)
                .orElseThrow(() -> new EntityNotFoundException("Order %s does not exists".formatted(id)));
    }

    public List<OrderResponse> getOrders(UUID customerId) {
        return orderRepository.findByCustomerId(customerId)
                .stream().map(this::mapOrderToResponse).toList();
    }

}
