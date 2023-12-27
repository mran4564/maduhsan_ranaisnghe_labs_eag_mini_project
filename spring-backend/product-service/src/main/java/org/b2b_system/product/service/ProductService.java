package org.b2b_system.product.service;

import org.b2b_system.product.dto.product.ApproveProductRequest;
import org.b2b_system.product.dto.product.ProductRequest;
import org.b2b_system.product.dto.product.ProductResponse;
import org.b2b_system.product.dto.product.UpdateProductRequest;
import org.b2b_system.product.model.ApproveStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface ProductService {

    ProductResponse createProduct(ProductRequest request);

    Page<ProductResponse> getAllProducts(Pageable pageable, UUID categoryId, String brandName, Boolean isInStock,
                                         ApproveStatus status);

    ProductResponse getProductDetails(UUID id);

    ProductResponse updateProductDetails(UUID id, UpdateProductRequest request);

    String deleteProduct(UUID id);

    ProductResponse approveProduct(UUID id, ApproveProductRequest approveProductRequest);

    ProductResponse updateProductStock(UUID id, int quantity, boolean increase);
}
