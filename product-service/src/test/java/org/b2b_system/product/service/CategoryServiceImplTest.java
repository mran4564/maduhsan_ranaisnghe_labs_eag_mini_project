package org.b2b_system.product.service;

import jakarta.persistence.EntityNotFoundException;
import org.b2b_system.product.dto.category.CategoryRequest;
import org.b2b_system.product.dto.category.CategoryResponse;
import org.b2b_system.product.dto.product.ProductRequest;
import org.b2b_system.product.dto.product.ProductResponse;
import org.b2b_system.product.dto.product.UpdateProductRequest;
import org.b2b_system.product.exception.EntityAlreadyExistsException;
import org.b2b_system.product.model.Category;
import org.b2b_system.product.model.Product;
import org.b2b_system.product.repository.CategoryRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CategoryServiceImplTest {

    private CategoryService underTest;

    @Mock
    private CategoryRepository categoryRepository;

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
        underTest = new CategoryServiceImpl(categoryRepository);
    }


    @Test
    void createCategoryShouldCreateProductSuccessfully() {
        CategoryRequest request = CategoryRequest
                .builder()
                .name("testCategory")
                .description("testDescription")
                .build();

        given(categoryRepository.existsByName(request.getName())).willReturn(false);
        given(categoryRepository.save(any())).willReturn(testCategory);

        // When
        CategoryResponse result = underTest.createCategory(request);

        // Then
        Assertions.assertAll(() -> {
            assert result != null;
            assertThat(result.getName()).isEqualTo(request.getName());
        });
    }

    @Test
    void createCategoryShouldThrowExceptionWhenCategoryIsAlreadyAvailable() {
        // Arrange
        CategoryRequest request = CategoryRequest
                .builder()
                .name("testCategory")
                .description("testDescription")
                .build();
        when(categoryRepository.existsByName(any())).thenReturn(true);

        // Act and Assert
        assertThrows(EntityAlreadyExistsException.class, () -> underTest.createCategory(request));
    }


    @Test
    void getAllCategoriesShouldReturnAllCategoriesSuccessfully() {
        when(categoryRepository.findAll()).thenReturn(new ArrayList<>());

        // Act
        List<CategoryResponse> response = underTest.getAllCategories();

        // Assert
        assertNotNull(response);
    }

    @Test
    void updateCategoryDetailsShouldUpdateCategorySuccessfully() {
        UUID categoryId = UUID.randomUUID();
        CategoryRequest request = new CategoryRequest("updatedCategory", "updatedDescription");
        when(categoryRepository.findByCategoryId(categoryId)).thenReturn(Optional.of(testCategory));

        when(categoryRepository.save(testCategory)).thenReturn(Category.builder()
                .name("updatedCategory")
                .description("updatedDescription")
                .build());
        // Act
        CategoryResponse response = underTest.updateCategoryDetails(categoryId, request);

        // Assert
        assertNotNull(response);
        assertEquals("updatedCategory", response.getName());
        assertEquals("updatedDescription", response.getDescription());
    }

    @Test
    void updateCategoryDetailsShouldThrowExceptionWhenCategoryIsNotAvailable() {
        UUID categoryId = UUID.randomUUID();
        // Arrange
        CategoryRequest request = CategoryRequest
                .builder()
                .name("testCategory")
                .description("testDescription")
                .build();
        when(categoryRepository.findByCategoryId(any())).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(EntityNotFoundException.class, () ->
                underTest.updateCategoryDetails(categoryId, request));
    }
}