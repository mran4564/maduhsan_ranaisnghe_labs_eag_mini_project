package org.b2b_system.order.repository;

import org.b2b_system.order.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    Optional<Order> findByOrderId(UUID id);
    List<Order> findByCustomerId(UUID customerId);
}
