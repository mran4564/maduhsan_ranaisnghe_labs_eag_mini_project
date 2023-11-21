package org.b2b_system.product.repository;

import org.b2b_system.product.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    boolean existsByName(String name);
    Optional<Product> findByProductId(UUID id);
}
