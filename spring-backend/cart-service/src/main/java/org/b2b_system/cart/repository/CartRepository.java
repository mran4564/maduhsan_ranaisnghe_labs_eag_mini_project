package org.b2b_system.cart.repository;

import org.b2b_system.cart.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    Optional<Cart> findByCartId(UUID id);
    Optional<Cart> findByCustomerId(UUID customerId);
}
