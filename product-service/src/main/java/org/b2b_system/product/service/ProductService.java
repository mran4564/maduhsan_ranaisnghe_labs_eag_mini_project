package org.b2b_system.product.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.b2b_system.product.dto.product.ProductRequest;
import org.b2b_system.product.dto.product.ProductResponse;
import org.b2b_system.product.dto.product.UpdateProductRequest;
import org.b2b_system.product.exception.EntityAlreadyExistsException;
import org.b2b_system.product.model.Product;
import org.b2b_system.product.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    Logger logger = LoggerFactory.getLogger(ProductService.class);

    /**
     * create new product
     * @param request ProductRequest Data
     * @return product Response
     */
    public ProductResponse createProduct(ProductRequest request) {
        if (productRepository.existsByName(request.getName())) {
            throw new EntityAlreadyExistsException("Product %s already exists".formatted(request.getName()));
        }

        var product = mapRequestToProduct(request);
        var savedProduct = productRepository.save(product);
        logger.info("Product saved successfully");

        return mapProductToResponse(savedProduct);
    }

    /**
     * Get All the products
     * @return list of productResponse objects
     */
    public List<ProductResponse> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return  products.stream().map(this::mapProductToResponse).toList();
    }

    /**
     * Update the product details
     * @param id productId of the product
     * @param request details of the product needed to be updated
     * @return ProductResponse
     */
    public ProductResponse updateProductDetails(UUID id, UpdateProductRequest request) {
        var product = productRepository.findByProductId(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Incorrect product_id or product with id - %s does not exist".formatted(id)));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setStockCount(request.getStockCount());
        product.setInStock(request.isInStock());
        product.setImageUrl(request.getImageUrl());
        var updatedCategory = productRepository.save(product);
        logger.info("Product Updated successfully");

        return mapProductToResponse(updatedCategory);
    }

    private ProductResponse mapProductToResponse(Product product) {
        return ProductResponse.builder()
                .productId(product.getProductId())
                .name(product.getName())
                .description(product.getDescription())
                .categoryId(product.getCategoryId())
                .supplierId(product.getSupplierId())
                .isInStock(product.isInStock())
                .stockCount(product.getStockCount())
                .imageUrl(product.getImageUrl())
                .brandName(product.getBrandName())
                .build();

    }

    private Product mapRequestToProduct(ProductRequest request) {
        return Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .categoryId(request.getCategoryId())
                .productId(UUID.randomUUID())
                .supplierId(request.getSupplierId())
                .isInStock(request.isInStock())
                .stockCount(request.getStockCount())
                .imageUrl(request.getImageUrl())
                .brandName(request.getBrandName())
                .build();
    }

}
