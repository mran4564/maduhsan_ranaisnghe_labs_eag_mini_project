package org.b2b_system.order.service;

import org.b2b_system.order.dto.orderitem.OrderItemResponse;
import org.b2b_system.order.dto.orderitem.UpdateOrderItemStatusRequest;

import java.util.List;
import java.util.UUID;

public interface OrderItemService {

    public List<OrderItemResponse> getOrderItems(UUID supplierId);

    public OrderItemResponse updateOrderItemStatus(UUID orderItemId, UpdateOrderItemStatusRequest request);
}
