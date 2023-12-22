package org.b2b_system.product.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.b2b_system.product.common.Constants;
import org.b2b_system.product.dto.product.ApproveProductRequest;
import org.b2b_system.product.dto.product.ProductRequest;
import org.b2b_system.product.dto.product.ProductResponse;
import org.b2b_system.product.dto.product.UpdateProductRequest;
import org.b2b_system.product.exception.EntityAlreadyExistsException;
import org.b2b_system.product.model.ApproveStatus;
import org.b2b_system.product.model.Category;
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

/**
 * Hold logic related to ProductService endpoints
 *
 * @author madushan ransinghe
 */
@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);
    private final CategoryRepository categoryRepository;

    /**
     * create new product
     *
     * @param request ProductRequest Data
     * @return product Response
     */
    public ProductResponse createProduct(ProductRequest request) {
        if (productRepository.existsByName(request.getName())) {
            throw new EntityAlreadyExistsException(Constants.PRODUCT_NAME_AVAILABLE_EXCEPTION_MESSAGE.formatted(request.getName()));
        }
        var category = categoryRepository.findByCategoryId(request.getCategoryId()).orElseThrow(
                () -> new EntityNotFoundException(Constants.CATEGORY_NOT_FOUND_EXCEPTION_MESSAGE.formatted(request.getCategoryId())));

        var product = mapRequestToProduct(request, category);
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
                                                String brandName, Boolean isInStock, ApproveStatus status) {

        return productRepository
                .findProductMatch(categoryId, brandName, isInStock, status, pageable)
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
        logger.info("Product with Id:{} Updated successfully", product.getProductId());

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
                        Constants.PRODUCT_NOT_FOUND_EXCEPTION_MESSAGE.formatted(id)));
        productRepository.delete(product);
        logger.info("Product with Id:{} deleted successfully", product.getProductId());
        return "Product deleted successfully";
    }

    /**
     * Approve Product By Sysco Data Stewards
     *
     * @param id                    product Id
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
     * @param id       product id
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
                .isApproved(product.getStatus())
                .build();

    }

    private Product mapRequestToProduct(ProductRequest request, Category category) {
        return Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .categoryId(request.getCategoryId())
                .categoryName(category.getName())
                .productId(UUID.randomUUID())
                .supplierId(request.getSupplierId())
                .isInStock(request.isInStock())
                .stockCount(request.getStockCount())
                .imageUrl(request.getImageUrl())
                .brandName(request.getBrandName())
                .price(request.getPrice())
                .status(ApproveStatus.PENDING)
                .build();
    }
}
