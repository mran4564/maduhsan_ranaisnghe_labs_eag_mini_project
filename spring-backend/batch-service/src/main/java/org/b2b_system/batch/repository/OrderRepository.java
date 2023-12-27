package org.b2b_system.batch.repository;

import org.b2b_system.batch.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> {
}
