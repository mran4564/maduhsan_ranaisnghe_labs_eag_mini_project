package org.b2b_system.order.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.b2b_system.order.dto.order.CreateOrderRequest;
import org.b2b_system.order.dto.order.OrderResponse;
import org.b2b_system.order.mapper.OrderMapper;
import org.b2b_system.order.model.OrderItem;
import org.b2b_system.order.repository.OrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

import static org.b2b_system.order.mapper.OrderItemMapper.mapRequestToOrderItem;
import static org.b2b_system.order.mapper.OrderMapper.mapOrderToResponse;
import static org.b2b_system.order.mapper.OrderMapper.mapRequestToOrder;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    Logger logger = LoggerFactory.getLogger(OrderServiceImpl.class);

    @Transactional
    public OrderResponse createOrder(CreateOrderRequest request) {
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

    public OrderResponse getOrderByOrderId(UUID id) {
        return orderRepository.findByOrderId(id).map(OrderMapper::mapOrderToResponse)
                .orElseThrow(() -> new EntityNotFoundException("Order %s does not exists".formatted(id)));
    }

    public List<OrderResponse> getOrders(UUID customerId) {
        return orderRepository.findByCustomerId(customerId)
                .stream().map(OrderMapper::mapOrderToResponse).toList();
    }
}