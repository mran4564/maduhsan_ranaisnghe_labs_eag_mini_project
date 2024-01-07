package org.b2b_system.product.repository;

import org.b2b_system.product.model.Category;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class CategoryRepositoryTest {

    @Autowired
    private CategoryRepository underTest;

    private Category testCategory;

    private UUID categoryId;

    @BeforeEach
    void setUp() {
        categoryId = UUID.randomUUID();

        testCategory = Category.builder()
                .categoryId(categoryId)
                .name("testCategory")
                .description("testDescription")
                .build();
    }

    @Test
    void existByNameShouldReturnTrueWhenProductExists() {
        // Arrange
        underTest.save(testCategory);

        // Act
        boolean result = underTest.existsByName(testCategory.getName());

        // Assert
        assertTrue(result);
    }

    @Test
    void existByNameShouldReturnFalseWhenProductDoesNotExists() {
        // Act
        boolean result = underTest.existsByName(testCategory.getName());

        // Assert
        assertFalse(result);
    }

    @Test
    void findByCategoryIdShouldReturnProduct(){
        // Arrange
        underTest.save(testCategory);

        // Act
        Optional<Category> result = underTest.findByCategoryId(testCategory.getCategoryId());

        // Assert
        assertFalse(result.isEmpty());
    }
}