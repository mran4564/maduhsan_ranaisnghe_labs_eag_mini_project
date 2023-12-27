package org.b2b_system.order.service;

import org.b2b_system.order.dto.orderitem.OrderItemResponse;
import org.b2b_system.order.dto.orderitem.UpdateOrderItemStatusRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface OrderItemService {

    public Page<OrderItemResponse> getOrderItems(Pageable page, UUID supplierId);

    public OrderItemResponse updateOrderItemStatus(UUID orderItemId, UpdateOrderItemStatusRequest request);
}
