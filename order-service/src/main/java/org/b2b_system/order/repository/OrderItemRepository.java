package org.b2b_system.order.repository;

import org.b2b_system.order.model.OrderItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
    Page<OrderItem> findBySupplierId(UUID supplierId, Pageable page);

    Optional<OrderItem> findByOrderItemId(UUID orderItemId);
}

