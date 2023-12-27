package org.b2b_system.product.repository;

import org.b2b_system.product.model.ApproveStatus;
import org.b2b_system.product.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    boolean existsByName(String name);

    Optional<Product> findByProductId(UUID id);

    @Query(value = "SELECT * FROM product p WHERE " +
            "(:categoryId is null OR p.category_id = :categoryId) AND " +
            "(:brandName is null OR p.brand_name = :brandName) AND " +
            "(:isInStock is null OR p.is_in_stock = :isInStock) AND" +
            "(:status is null OR p.status = :#{#status?.ordinal()})", nativeQuery = true)
    Page<Product> findProductMatch(@Param("categoryId") UUID categoryId,
                                   @Param("brandName") String brandName,
                                   @Param("isInStock") Boolean isInStock,
                                   @Param("status") ApproveStatus status,
                                   Pageable pageable);
}
