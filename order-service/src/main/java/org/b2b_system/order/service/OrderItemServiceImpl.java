package org.b2b_system.order.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.b2b_system.order.dto.orderitem.OrderItemResponse;
import org.b2b_system.order.dto.orderitem.UpdateOrderItemStatusRequest;
import org.b2b_system.order.mapper.OrderItemMapper;
import org.b2b_system.order.repository.OrderItemRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderItemServiceImpl implements OrderItemService {

    private final OrderItemRepository orderItemRepository;
    Logger logger = LoggerFactory.getLogger(OrderItemServiceImpl.class);

    @Override
    public List<OrderItemResponse> getOrderItems(UUID supplierId) {
        return orderItemRepository.findBySupplierId(supplierId)
                .stream().map(OrderItemMapper::mapOrderItemToResponse)
                .toList();
    }

    @Override
    public OrderItemResponse updateOrderItemStatus(UUID orderItemId, UpdateOrderItemStatusRequest request) {
        return orderItemRepository.findByOrderItemId(orderItemId)
                .map(orderItem -> {
                    orderItem.setStatus(request.getOrderItemStatus());
                    var updatedOrderItem = orderItemRepository.save(orderItem);
                    logger.info("OrderItem status updated for order %s".formatted(orderItemId));
                    return OrderItemMapper.mapOrderItemToResponse(updatedOrderItem);
                }).orElseThrow(() -> new EntityNotFoundException("Item with %s does not exists".formatted(orderItemId)));
    }
}
