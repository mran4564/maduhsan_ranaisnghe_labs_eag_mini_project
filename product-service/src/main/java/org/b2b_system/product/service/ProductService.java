package org.b2b_system.product.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.b2b_system.product.dto.product.ApproveProductRequest;
import org.b2b_system.product.dto.product.ProductRequest;
import org.b2b_system.product.dto.product.ProductResponse;
import org.b2b_system.product.dto.product.UpdateProductRequest;
import org.b2b_system.product.exception.EntityAlreadyExistsException;
import org.b2b_system.product.model.ApproveStatus;
import org.b2b_system.product.model.Product;
import org.b2b_system.product.repository.CategoryRepository;
import org.b2b_system.product.repository.ProductRepository;
import org.b2b_system.product.utils.ErrorMessages;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    Logger logger = LoggerFactory.getLogger(ProductService.class);
    private final CategoryRepository categoryRepository;

    /**
     * create new product
     *
     * @param request ProductRequest Data
     * @return product Response
     */
    public ProductResponse createProduct(ProductRequest request) {
        if (productRepository.existsByName(request.getName())) {
            throw new EntityAlreadyExistsException("Product %s already exists".formatted(request.getName()));
        }
        if (!categoryRepository.existsByCategoryId(request.getCategoryId())) {
            throw new EntityNotFoundException("Category with id %s is not available".formatted(request.getCategoryId()));
        }

        var product = mapRequestToProduct(request);
        var savedProduct = productRepository.save(product);
        logger.info("Product saved successfully");

        return mapProductToResponse(savedProduct);
    }

    /**
     * Get All the products with Filters applied
     *
     * @param categoryId category Id
     * @param brandName  Brand of the supplier
     * @return list of productResponse objects
     */
    public Page<ProductResponse> getAllProducts(Pageable pageable, UUID categoryId,
                                                String brandName, Boolean isInStock) {
        return productRepository
                .findProductMatch(categoryId, brandName, isInStock, pageable)
                .map(this::mapProductToResponse);
    }

    /**
     * Get Product Details by ProductId
     *
     * @param id product Id
     * @return product Details
     */
    public ProductResponse getProductDetails(UUID id) {
        var product = productRepository.findByProductId(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        ErrorMessages.ProductNotFound.formatted(id)));

        return mapProductToResponse(product);
    }

    /**
     * Update the product details
     *
     * @param id      productId of the product
     * @param request details of the product needed to be updated
     * @return ProductResponse
     */
    public ProductResponse updateProductDetails(UUID id, UpdateProductRequest request) {
        var product = productRepository.findByProductId(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        ErrorMessages.ProductNotFound.formatted(id)));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setStockCount(request.getStockCount());
        product.setInStock(request.isInStock());
        product.setImageUrl(request.getImageUrl());
        product.setPrice(request.getPrice());
        var updatedCategory = productRepository.save(product);
        logger.info("Product Updated successfully");

        return mapProductToResponse(updatedCategory);
    }

    /**
     * Delete Product by id
     *
     * @param id product Id
     * @return String message
     */
    public String deleteProduct(UUID id) {
        var product = productRepository.findByProductId(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Incorrect product_id or product with id - %s does not exist".formatted(id)));
        productRepository.delete(product);
        logger.info("Product deleted successfully");

        return "Product deleted successfully";
    }

    /**
     * Approve Product By Sysco Data Stewards
     *
     * @param id product Id
     * @param approveProductRequest Product Update Request
     * @return updated Product
     */
    public ProductResponse approveProduct(UUID id, ApproveProductRequest approveProductRequest) {
        return productRepository.findByProductId(id).map(
                product -> {
                    product.setStatus(approveProductRequest.getApproved());
                    productRepository.save(product);
                    return mapProductToResponse(product);
                }
        ).orElseThrow(() -> new EntityNotFoundException(
                ErrorMessages.ProductNotFound.formatted(id)));
    }

    /**
     * increase or decrease the product quantity
     *
     * @param id product id
     * @param quantity product quantity
     * @param increase operation need to be done increase or decrease
     * @return updated product
     */
    public ProductResponse updateProductStock(UUID id, int quantity, boolean increase) {
        var product = productRepository.findByProductId(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        ErrorMessages.ProductNotFound.formatted(id)));
        product.updateStock(increase, quantity);
        var updatedProduct = productRepository.save(product);
        logger.info("Product quantity updated successfully");

        return mapProductToResponse(updatedProduct);
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
                .price(product.getPrice())
                .isApproved(ApproveStatus.PENDING)
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
                .price(request.getPrice())
                .build();
    }
}
