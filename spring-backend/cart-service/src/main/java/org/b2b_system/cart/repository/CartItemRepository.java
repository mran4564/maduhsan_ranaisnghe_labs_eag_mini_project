package org.b2b_system.cart.repository;

import org.b2b_system.cart.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    Optional<CartItem> findByCartItemId(UUID id);
    Optional<CartItem> findByProductId(UUID id);
}
