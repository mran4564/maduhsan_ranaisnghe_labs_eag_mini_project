package org.b2b_system.product.service;

import jakarta.persistence.EntityNotFoundException;
import org.b2b_system.product.dto.product.ApproveProductRequest;
import org.b2b_system.product.dto.product.ProductRequest;
import org.b2b_system.product.dto.product.ProductResponse;
import org.b2b_system.product.dto.product.UpdateProductRequest;
import org.b2b_system.product.exception.EntityAlreadyExistsException;
import org.b2b_system.product.exception.NoSuchElementFoundException;
import org.b2b_system.product.model.ApproveStatus;
import org.b2b_system.product.model.Category;
import org.b2b_system.product.model.Product;
import org.b2b_system.product.repository.CategoryRepository;
import org.b2b_system.product.repository.ProductRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.security.InvalidParameterException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductServiceImplTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private CategoryRepository categoryRepository;

    private ProductService underTest;

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
                .productId(productId)
                .brandName(brandName)
                .isInStock(true)
                .price(new BigDecimal("10.0"))
                .name(productName)
                .build();
        underTest = new ProductServiceImpl(productRepository, categoryRepository);
    }

    @Test
    void createProductShouldCreateProductSuccessfully() {
        // Given a Product
        ProductRequest request = ProductRequest
                .builder()
                .name("Apple")
                .price(BigDecimal.valueOf(12.5))
                .brandName("Fresh Food")
                .isInStock(true)
                .build();

        given(productRepository.existsByName(request.getName())).willReturn(false);
        given(categoryRepository.findByCategoryId(request.getCategoryId())).willReturn(Optional.of(new Category()));
        given(productRepository.save(any())).willReturn(Product.builder()
                .name("Apple")
                .price(BigDecimal.valueOf(12.5))
                .brandName("Fresh Food")
                .build()
        );

        // When
        ProductResponse result = underTest.createProduct(request);

        // Then
        Assertions.assertAll(
                () -> {
                    assert result != null;
                    assertThat(result.getName()).isEqualTo(request.getName());
                }
        );
    }

    @Test
    void createProductShouldThrowExceptionWhenProductAlreadyExists() {
        // Arrange
        ProductRequest request = new ProductRequest();
        when(productRepository.existsByName(request.getName())).thenReturn(true);

        // Act and Assert
        assertThrows(EntityAlreadyExistsException.class, () -> underTest.createProduct(request));
    }

    @Test
    void createProductShouldThrowExceptionWhenCategoryNotFound() {
        // Arrange
        ProductRequest request = new ProductRequest();
        when(categoryRepository.findByCategoryId(any())).thenReturn(java.util.Optional.empty());

        // Act and Assert
        assertThrows(NoSuchElementFoundException.class, () -> underTest.createProduct(request));
    }

    @Test
    void getAllProductsShouldReturnProductsWhenSuccessful() {
        // Arrange
        List<Product> products = Collections.singletonList(testProduct);
        Page<Product> productPage = new PageImpl<>(products);
        when(productRepository.findProductMatch(categoryId, brandName, isInStock, status, Pageable.unpaged()))
                .thenReturn(productPage);

        // Act
        Page<ProductResponse> result = underTest.getAllProducts(Pageable.unpaged(), categoryId, brandName, isInStock, status);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.getContent().size());
        assertEquals("TestProduct", result.getContent().get(0).getName());
        assertEquals(new BigDecimal("10.0"), result.getContent().get(0).getPrice());
    }

    @Test
    void getAllProductsShouldReturnEmptyResultWhenProductListIsEmpty() {
        // Arrange
        when(productRepository.findProductMatch(categoryId, brandName, isInStock, status, Pageable.unpaged()))
                .thenReturn(Page.empty());

        // Act
        Page<ProductResponse> result = underTest.getAllProducts(Pageable.unpaged(), categoryId, brandName, isInStock,
                status);

        // Assert
        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    void getProductDetailsShouldReturnProductDetailsWhenSuccessful() {
        // Arrange
        when(productRepository.findByProductId(productId)).thenReturn(Optional.of(testProduct));

        // Act
        ProductResponse response = underTest.getProductDetails(productId);

        // Assert
        assertNotNull(response);
        assertEquals(productId, response.getProductId());
        assertEquals(productName, response.getName());
        assertEquals(new BigDecimal("10.0"), response.getPrice());
    }

    @Test
    void getProductDetailsShouldThrowExceptionWhenProductNotFound() {
        // Arrange
        when(productRepository.findByProductId(any())).thenReturn(java.util.Optional.empty());

        // Act and Assert
        assertThrows(EntityNotFoundException.class, () -> underTest.getProductDetails(productId));
    }

    @Test
    void updateProductDetailsShouldUpdateSuccessfully() {
        // Arrange
        UUID productId = UUID.randomUUID();
        UpdateProductRequest request = new UpdateProductRequest("NewName", "NewDescription",
                50, "new/image.jpg", true, new BigDecimal("29.99"));
        when(productRepository.findByProductId(productId)).thenReturn(Optional.of(testProduct));
        when(productRepository.save(testProduct)).thenReturn(Product.builder()
                .name(request.getName())
                .stockCount(request.getStockCount())
                .price(request.getPrice())
                .imageUrl(request.getImageUrl())
                        .isInStock(request.isInStock())
                .description(request.getDescription())
                .build());
        // Act
        ProductResponse response = underTest.updateProductDetails(productId, request);

        // Assert
        assertNotNull(response);
        assertEquals("NewName", response.getName());
        assertEquals("NewDescription", response.getDescription());
        assertEquals(50, response.getStockCount());
        assertTrue(response.isInStock());
        assertEquals("new/image.jpg", response.getImageUrl());
        assertEquals(new BigDecimal("29.99"), response.getPrice());
    }

    @Test
    void updateProductDetailsShouldThrowEntityNotFoundExceptionForInvalidProductId() {
        // Arrange
        UpdateProductRequest request = new UpdateProductRequest("NewName", "NewDescription",
                50, "new/image.jpg", true, new BigDecimal("29.99"));
        when(productRepository.findByProductId(any())).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(EntityNotFoundException.class, () -> underTest.updateProductDetails(productId, request));
    }

    @Test
    void updateProductDetailsShouldThrowExceptionForNegativeStockCount() {
        // Arrange
        UpdateProductRequest request = new UpdateProductRequest("NewName", "NewDescription",
                -50, "new/image.jpg", true, new BigDecimal("29.99"));

        when(productRepository.findByProductId(productId)).thenReturn(Optional.of(testProduct));

        // Act and Assert
        assertThrows(InvalidParameterException.class, () -> underTest.updateProductDetails(productId, request));
    }

    @Test
    void deleteProductShouldDeleteProductSuccessfully() {
        // Arrange
        when(productRepository.findByProductId(productId)).thenReturn(Optional.of(testProduct));
        productRepository.delete(testProduct);

        // Act
        String result = underTest.deleteProduct(productId);

        // Assert
        assertEquals("Product deleted successfully", result);
    }

    @Test
    void deleteProductShouldThrowEntityNotFoundExceptionForInvalidProductId() {
        // Arrange
        when(productRepository.findByProductId(productId)).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(EntityNotFoundException.class, () -> underTest.deleteProduct(productId));
    }

    @Test
    void approveProductShouldApproveProductSuccessfully() {
        // Arrange
        ApproveProductRequest approveProductRequest = new ApproveProductRequest(ApproveStatus.APPROVED);
        when(productRepository.findByProductId(productId)).thenReturn(Optional.of(testProduct));
        testProduct.setStatus(approveProductRequest.getApproved());
        productRepository.save(testProduct);

        // Act
        ProductResponse result = underTest.approveProduct(productId, approveProductRequest);

        // Assert
        assertNotNull(result);
        assertEquals(ApproveStatus.APPROVED,result.getIsApproved());
    }


    @Test
    void approveProductShouldThrowEntityNotFoundExceptionForInvalidProductId() {
        // Arrange
        ApproveProductRequest approveProductRequest = new ApproveProductRequest(ApproveStatus.APPROVED);
        when(productRepository.findByProductId(productId)).thenReturn(java.util.Optional.empty());

        // Act and Assert
        assertThrows(EntityNotFoundException.class, () -> underTest.approveProduct(productId,
                approveProductRequest));
    }

    @Test
    void shouldThrowExceptionForNullApproveProductRequest() {
        // Act and Assert
        assertThrows(EntityNotFoundException.class, () -> underTest.approveProduct(productId, null));
    }

    @Test
    void shouldDenyProductApproval() {
        // Arrange
        ApproveProductRequest denyRequest = new ApproveProductRequest(ApproveStatus.REJECTED);
        when(productRepository.findByProductId(productId)).thenReturn(Optional.of(testProduct));
        testProduct.setStatus(denyRequest.getApproved());
        productRepository.save(testProduct);

        // Act
        ProductResponse result = underTest.approveProduct(productId, denyRequest);

        // Assert
        assertNotNull(result);
        assertEquals(ApproveStatus.REJECTED, result.getIsApproved());
    }
}