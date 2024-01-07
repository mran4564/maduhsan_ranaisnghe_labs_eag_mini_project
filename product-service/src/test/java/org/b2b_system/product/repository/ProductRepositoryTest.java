package org.b2b_system.product.repository;

import org.b2b_system.product.model.ApproveStatus;
import org.b2b_system.product.model.Product;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.math.BigDecimal;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class ProductRepositoryTest {

    @Autowired
    private ProductRepository underTest;

    private Product testProduct;

    private UUID categoryId;
    private UUID productId;
    private String brandName;
    private String productName;
    private Boolean isInStock;
    private ApproveStatus status;

    @BeforeEach
    void setUp() {
        categoryId = UUID.randomUUID();
        productId = UUID.randomUUID();
        brandName = "TestBrand";
        productName = "TestProduct";
        isInStock = true;
        status = ApproveStatus.APPROVED;
        testProduct = Product.builder()
                .categoryId(categoryId)
                .isInStock(isInStock)
                .status(status)
                .productId(productId)
                .brandName(brandName)
                .price(new BigDecimal("10.0"))
                .name(productName)
                .build();
    }

    @Test
    void existByNameShouldReturnTrueWhenProductExists() {
        // Arrange
        underTest.save(testProduct);

        // Act
        boolean result = underTest.existsByName(productName);

        // Assert
        assertTrue(result);
    }

    @Test
    void existByNameShouldReturnFalseWhenProductDoesNotExists() {

        // Act
        boolean result = underTest.existsByName(productName);

        // Assert
        assertFalse(result);
    }

    @Test
    void shouldFindProductsMatchingCriteria() {
        // Arrange
        var nonMatchProduct = Product.builder()
                .categoryId(categoryId)
                .status(ApproveStatus.PENDING)
                .brandName("NotMatch")
                .build();

        // Assuming the products with matching criteria exist in the repository
        underTest.save(testProduct);
        // Some non-matching product
        underTest.save(nonMatchProduct);

        // Act
        Page<Product> result = underTest.findProductMatch(categoryId, brandName, isInStock, status, PageRequest.of(0, 10));

        // Assert
        assertNotNull(result);
        assertEquals(1, result.getTotalElements()); // Assuming 2 products match the criteria
    }

    @Test
    void shouldFindAllProductsWhenCriteriaAreEmpty() {
        // Act
        Page<Product> result = underTest.findProductMatch(null, null, null, null,
                PageRequest.of(0, 10));

        // Assert
        assertNotNull(result);
    }


}