package org.b2b_system.product.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.b2b_system.product.dto.product.ApproveProductRequest;
import org.b2b_system.product.dto.product.ProductRequest;
import org.b2b_system.product.dto.product.ProductResponse;
import org.b2b_system.product.dto.product.UpdateProductRequest;
import org.b2b_system.product.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * Controller class that defines the Product endpoints
 *
 * @author Madushan Ransinghe
 */
@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(
            @RequestBody @Valid ProductRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.createProduct(request));
    }

    @GetMapping
    public ResponseEntity<Page<ProductResponse>> getAll(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "category_id", required = false) UUID categoryId,
            @RequestParam(name = "brand_name", required = false) String brandName,
            @RequestParam(name = "in_stock", required = false) Boolean isInStock
    ) {
        Pageable pageRequest = PageRequest.of(page, size);
        return new ResponseEntity<>(productService.
                getAllProducts(pageRequest, categoryId, brandName, isInStock), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductDetails(
            @PathVariable("id") UUID id
    ) {
        return new ResponseEntity<>(productService.getProductDetails(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProductDetails(
            @PathVariable("id") UUID id, @RequestBody UpdateProductRequest request
    ) {
        return new ResponseEntity<>(productService.updateProductDetails(id, request), HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ProductResponse> approveProduct(
            @PathVariable("id") UUID id, @RequestBody ApproveProductRequest approveProductRequest
            ) {
        return new ResponseEntity<>(productService.approveProduct(id, approveProductRequest), HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") UUID id) {
        return new ResponseEntity<>(productService.deleteProduct(id), HttpStatus.OK);
    }

    @PatchMapping("/{id}/stock")
    public ResponseEntity<ProductResponse> updateProductStock(@PathVariable("id") UUID id,
                                                     @RequestParam(name="quantity", defaultValue = "1")  int quantity,
                                                     @RequestParam(name="increase", defaultValue = "false") boolean increase) {


            return new ResponseEntity<>(productService.updateProductStock(id, quantity,increase), HttpStatus.OK);
    }

}
