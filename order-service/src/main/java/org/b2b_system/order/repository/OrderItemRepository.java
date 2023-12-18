package org.b2b_system.order.repository;

import org.b2b_system.order.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
    List<OrderItem> findBySupplierId(UUID supplierId);

    Optional<OrderItem> findByOrderItemId(UUID orderItemId);
}

